import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoriteSlice";

// Carrega o estado inicial do localStorage
const loadInitialState = () => {
  if (typeof window === "undefined") {
    return {
      cart: cartReducer(undefined, { type: "" }),
      favorites: favoritesReducer(undefined, { type: "" }),
    };
  }

  const cart = localStorage.getItem("cart");
  const favorites = localStorage.getItem("favorites");

  return {
    cart: cart ? JSON.parse(cart) : cartReducer(undefined, { type: "" }),
    favorites: favorites
      ? JSON.parse(favorites)
      : favoritesReducer(undefined, { type: "" }),
  };
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadInitialState(),
});

// Salva no localStorage quando muda
if (typeof window !== "undefined") {
  store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
