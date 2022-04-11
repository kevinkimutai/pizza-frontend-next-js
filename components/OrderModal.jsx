import styles from "../styles/OrderModal.module.css";

import { useRef } from "react";

function OrderModal({ fetchOrders, total }) {
  const customerRef = useRef();
  const addressRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const customerRefValue = customerRef.current.value;
    const addressRefValue = addressRef.current.value;

    const orderData = {
      customer: customerRefValue,
      address: addressRefValue,
      total: total,
      status: 0,
      method: "cash",
    };

    fetchOrders(orderData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Fill in the details to complete your order</h2>

        <form className={styles.orderForm} onSubmit={submitHandler}>
          <div className={styles.item}>
            <label for="name">Name</label>
            <input id="name" type="text" ref={customerRef} />
          </div>

          <div className={styles.item}>
            <label for="address">address</label>
            <textarea rows={5} id="address" type="text" ref={addressRef} />
          </div>

          <button className={styles.orderBtn} type="submit">
            Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;

// {
//     customer: {
//       type: String,
//       required: true,
//       maxlength: 60,
//     },
//     address: {
//       type: String,
//       required: true,
//       maxlength: 200,
//     },
//     total: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       default: 0,
//     },
//     method: {
//       type: String,
//       required: true,
//     },
//   },
