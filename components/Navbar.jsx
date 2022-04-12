import { useSelector } from "react-redux";
import Link from "next/link";

import Image from "next/image";

import styles from "../styles/Navbar.module.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.navbarLinks}>
        <div className={styles.link}>
          <div className={styles.call}>
            <span>CALL NOW</span> <span>07245542542</span>
          </div>
          <Link href="/">
            <div className={styles.logo}>pizza kenya</div>
          </Link>
        </div>

        <div className={styles.item}>
          <Link href="/cart">
            <div className={styles.cart}>
              <Image src="/images/cart.png" alt="" width="30px" height="30px" />
              <div className={styles.counter}>{cartItems}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
