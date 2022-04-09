import { createSlice } from "@reduxjs/toolkit";

const initialState = { pizzas: [], total: 0, quantity: 0 };
const cartSlice = createSlice({
  name: "pizzaSlice",
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      const { cart } = action.payload;
      state.pizzas.push(cart);
      state.quantity += 1;
      state.total += action.payload.prices * action.payload.quantity;
    },
    removePizzaFromCart(state, action) {},
    reset() {},
  },
});

export const cartSliceActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
