import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Redux/UserReducer"

const store = configureStore({
    reducer:{
        users : UserReducer,
    },
});

export default store;