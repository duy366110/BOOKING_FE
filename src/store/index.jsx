import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./store-auth";
import BookingReducer from "./store-booking";
import SearchReducer from "./store-search";

const storeConfig = configureStore({
    reducer: {
        auth: AuthReducer,
        booking: BookingReducer,
        search: SearchReducer
    }
})

export default storeConfig;