import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../features/alert/alertSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
    },
});

export default store;
