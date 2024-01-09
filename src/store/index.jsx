import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./store-auth";
import SearchReducer from "./store-search";
import PopupReducer from "./store-popup";
import LazyReducer from "./store-lazy";

const storeConfig = configureStore({
    reducer: {
        auth: AuthReducer,
        search: SearchReducer,
        popup: PopupReducer,
        lazy: LazyReducer
    }
})

export default storeConfig;