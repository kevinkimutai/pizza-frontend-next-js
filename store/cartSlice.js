import { createSlice } from "@reduxjs/toolkit";

const initialState = { pizzas: [], total: 0, quantity: 0 };
const cartSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      const { cart } = action.payload;
      console.log(cart);

      state.pizzas.push(cart);
      state.quantity += 1;
      state.total += cart.prices * cart.quantity;
    },
    removePizzaFromCart(state, action) {},
    reset(state) {
      state = initialState;
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
