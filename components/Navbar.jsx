import { useSelector } from "react-redux";

import Image from "next/image";

import styles from "../styles/Navbar.module.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <ul className={styles.navbarLinks}>
        <li className={styles.link}>
          <span>CALL NOW</span> <span>07245542542</span>
        </li>

        <li className={styles.logo}>pizza kenya</li>

        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/images/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{cartItems}</div>
          </div>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
