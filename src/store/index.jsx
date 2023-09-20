import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./store-auth";
import BookingReducer from "./store-booking";
import SearchReducer from "./store-search";
import PopupReducer from "./store-popup";

const storeConfig = configureStore({
    reducer: {
        auth: AuthReducer,
        booking: BookingReducer,
        search: SearchReducer,
        popup: PopupReducer
    }
})

export default storeConfig;