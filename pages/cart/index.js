import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import Image from "next/image";

import styles from "../../styles/Cart.module.css";

import { useSelector, useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const amount = "2";
  const currency = "USD";
  const style = { layout: "vertical" };

  const [checkoutBtnToggle, setCheckoutBtnToggle] = useState(false);

  const fetchOrders = async (payment) => {
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        body: JSON.stringify(payment),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      dispatch(cartSliceActions.reset());
      await router.push(`/order/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (paymentDetails) {
              // Your code here after capture the order

              console.log(paymentDetails);
              const userPaymentDetails = paymentDetails.payer;
              const orderDetails = {
                customer:
                  userPaymentDetails.name.given_name +
                  " " +
                  userPaymentDetails.name.surname,
                address: userPaymentDetails.email_address,
                total: cart.total,
                method: "paypal",
              };

              fetchOrders(orderDetails);
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <h1 className={styles.cartTitle}>Your Cart</h1>
        <table className={styles.table}>
          <tr className={styles.tableHead}>
            <th>product</th>
            <th>name</th>
            <th>size</th>
            <th>toppings</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
          </tr>
          {cart.pizzas.map((pizza, i) => (
            <tr className={styles.tableData} key={i}>
              <td>
                <div className={styles.imageContainer}>
                  <Image src={pizza.img} layout="fill" objectFit="cover" />
                </div>
              </td>
              <td>{pizza.title}</td>
              <td>{pizza.size}</td>
              <td>{pizza.extraOptions}</td>
              <td>{pizza.prices}</td>
              <td>{pizza.quantity}</td>
              <td>{pizza.quantity * pizza.prices}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.totalContainer}>
        <h1 className={styles.cartTitle}>Total</h1>
        <div className={styles.totalBox}>
          <div className={styles.totalDetails}>
            Subtotal:<span>Kshs</span>
            <span>{cart.total}</span>
          </div>
          <div className={styles.totalDetails}>
            Discount:<span>Kshs</span>
            <span>0</span>
          </div>
          <div className={styles.totalDetails}>
            Total:<span>Kshs</span>
            <span>{cart.total}</span>
          </div>
          {!checkoutBtnToggle ? (
            <button
              className={styles.checkout}
              onClick={() => setCheckoutBtnToggle(true)}
            >
              Checkout
            </button>
          ) : (
            <>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AYAr_rynvkNoE_QZ3FrfbJkZT5JEFSVyD-3YnI-OCaSPf43_KT_eeFRtT71KmpcsLfkDgeiMDU5i09ZP",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>

              <button className={styles.paymentCashBtn}>
                CASH ON DELIVERY
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cart;
