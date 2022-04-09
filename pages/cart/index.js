import Image from "next/image";

import styles from "../../styles/Cart.module.css";

function Cart() {
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
          <tr className={styles.tableData}>
            <td>
              <div className={styles.imageContainer}>
                <Image
                  src="/images/pizza.png"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </td>
            <td>Fruta de mayo</td>
            <td>large</td>
            <td>Pepperoni,Extra Cheese,Mayo</td>
            <td>1200</td>
            <td>1</td>
            <td>1200</td>
          </tr>
        </table>
      </div>
      <div className={styles.totalContainer}>
        <h1 className={styles.cartTitle}>Total</h1>
        <div className={styles.totalBox}>
          <div className={styles.totalDetails}>
            Subtotal:<span>Kshs</span>
            <span>1250</span>
          </div>
          <div className={styles.totalDetails}>
            Discount:<span>Kshs</span>
            <span>0</span>
          </div>
          <div className={styles.totalDetails}>
            Total:<span>Kshs</span>
            <span>1250</span>
          </div>
          <button className={styles.checkout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
