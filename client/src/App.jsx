import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/app/store";

function App() {
    return (
        <>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Router>
            </Provider>
            <Toaster richColors />
        </>
    );
}

export default App;
