import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./BookReducer/bookReducer";
import categoryReducer from "./CategoryReducer/categoryReducer";
import userReducer from "./UserReducer/userReducer";
import checkoutReducer from "./CheckoutReducer/checkoutReducer";
import reviewReducer from "./ReviewReducer/reviewReducer";
import historyReducer from "./HistoryReducer/historyReducer";
import messageReducer from "./MessageReducer/messageReducer";

export const store = configureStore({
    reducer: {
        categoryReducer,
        bookReducer,
        userReducer,
        checkoutReducer,
        reviewReducer,
        historyReducer,
        messageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch