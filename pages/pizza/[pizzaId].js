import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cartSlice";

import Image from "next/image";

import styles from "../../styles/Pizza.module.css";

export default function Pizza({ pizza }) {
  const [pizzaSizeState, setPizzaSizeState] = useState(0);
  const [pizzaOptions, setPizzaOptions] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const optionsHandler = (e, options) => {
    const checked = e.target.checked;

    if (checked) {
      setPizzaOptions((prevState) => [...prevState, options]);
    } else {
      setPizzaOptions(pizzaOptions.filter((option) => option !== option));
    }
  };

  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const addtoCartHandler = () => {
    let size;
    switch (pizzaSizeState) {
      case 0:
        size = "small";
        break;

      case 1:
        size = "medium";
        break;

      case 2:
        size = "large";
        break;
    }

    const cart = {
      ...pizza,
      prices: pizza.prices[pizzaSizeState],
      extraOptions: pizzaOptions,
      quantity: +quantity,
      size,
    };

    dispatch(cartSliceActions.addPizzaToCart({ cart }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={pizza.img} width="500" height="500" />
      </div>
      <div className={styles.pizzaDetails}>
        <h1> {pizza.title}</h1>
        <span className={styles.currency}>Kshs</span>
        <span className={styles.price}>{pizza.prices[pizzaSizeState]}</span>
        <div className={styles.desc}>{pizza.desc}</div>

        <h2 className={styles.pizzaHeader}>Choose the size?</h2>
        <div className={styles.pizzaImage}>
          <div className={styles.pizzaWrapper}>
            <span className={styles.pizzaSize}>small</span>
            <Image
              src="/images/size.png"
              width="100"
              height="100"
              onClick={() => {
                setPizzaSizeState(0);
              }}
            />
          </div>
          <div className={styles.pizzaWrapper}>
            <span className={styles.pizzaSize}>medium</span>
            <Image
              src="/images/size.png"
              width="150"
              height="150"
              onClick={() => {
                setPizzaSizeState(1);
              }}
            />
          </div>

          <div className={styles.pizzaWrapper}>
            <span className={styles.pizzaSize}>large</span>
            <Image
              src="/images/size.png"
              width="200"
              height="200"
              onClick={() => {
                setPizzaSizeState(2);
              }}
            />
          </div>
        </div>

        <h2 className={styles.pizzaHeader}>Choose Toppings</h2>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((options, i) => (
            <div className={styles.option} key={i}>
              <input
                type="checkbox"
                id={options}
                name={options}
                className={styles.checkbox}
                onChange={(e) => optionsHandler(e, options)}
              />
              <label htmlFor={options}>{options}</label>
            </div>
          ))}
          ;
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            onChange={quantityHandler}
          />
          <button className={styles.button} onClick={addtoCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  //fetch pizza

  const { pizzaId } = ctx.params;

  const res = await fetch(`http://localhost:3000/api/pizzas/${pizzaId}`);
  const data = await res.json();

  return {
    props: {
      pizza: data,
    },
  };
};
