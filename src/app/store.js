import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// Global store setup, prevent prop drilling
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
