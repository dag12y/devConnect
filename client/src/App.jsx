import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "sonner";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/app/store";
import { loadUser } from "./redux/features/auth/auth";

function AppContent() {
    const dispatch = useDispatch();

    useEffect(
        function () {
            if (localStorage.getItem("token")) {
                dispatch(loadUser());
            }
        },
        [dispatch],
    );

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <>
            <Provider store={store}>
                <AppContent />
            </Provider>
            <Toaster richColors />
        </>
    );
}

export default App;
