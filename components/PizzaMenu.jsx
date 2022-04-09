import PizzaList from "./PizzaList";

import styles from "../styles/PizzaMenu.module.css";

function PizzaMenu({ pizzas }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Our pizzas</h1>
      <div className={styles.wrapper}>
        {pizzas.map((pizza) => (
          <PizzaList key={pizza._id} {...pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaMenu;
