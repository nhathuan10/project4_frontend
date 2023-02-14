import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./CategoryReducer/categoryReducer";

export const store = configureStore({
    reducer: {
        categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch