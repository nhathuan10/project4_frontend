import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./BookReducer/bookReducer";
import categoryReducer from "./CategoryReducer/categoryReducer";
import userReducer from "./UserReducer/userReducer";
import checkoutReducer from "./CheckoutReducer/checkoutReducer";

export const store = configureStore({
    reducer: {
        categoryReducer,
        bookReducer,
        userReducer,
        checkoutReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch