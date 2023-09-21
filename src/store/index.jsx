import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./store-auth";
import SearchReducer from "./store-search";
import PopupReducer from "./store-popup";

const storeConfig = configureStore({
    reducer: {
        auth: AuthReducer,
        search: SearchReducer,
        popup: PopupReducer
    }
})

export default storeConfig;