import { useState } from "react";

import Image from "next/image";

import styles from "../../styles/Admin.module.css";

const orderStatus = ["preparing", "on the way", "delivered"];

export default function Admin({ pizzaList, orderList }) {
  const [pizzas, setPizzas] = useState(pizzaList);
  const deleteBtnHandler = async (id) => {
    const res = await fetch(url);
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => editBtnHandler(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => deleteBtnHandler(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paypal</span>}
                </td>
                <td>{orderStatus[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const resPizzas = await fetch("http://localhost:3000/api/pizzas");
    const pizzasData = await resPizzas.json();

    const resOrders = await fetch("http://localhost:3000/api/order");
    const ordersData = await resOrders.json();

    return {
      props: {
        pizzaList: pizzasData,
        orderList: ordersData,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
