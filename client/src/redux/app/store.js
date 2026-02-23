import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../features/alert/alertSlice";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";

const store = configureStore({
    reducer: {
        alert: alertReducer,
        auth: authReducer,
        profile: profileReducer,
    },
    devTools: true,
});

export default store;
