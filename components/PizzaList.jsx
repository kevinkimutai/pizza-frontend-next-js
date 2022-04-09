import Image from "next/image";
import Link from "next/link";

import styles from "../styles/PizzaList.module.css";

function PizzaList({ img, title, prices, desc, _id }) {
  return (
    <Link href={`/pizza/${_id}`}>
      <div className={styles.container}>
        <Image src={img} width="150" height="150" />
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.price}>
          <span>Kshs</span>
          {prices[0]}
        </h3>
        <p>{desc}</p>
      </div>
    </Link>
  );
}

export default PizzaList;
