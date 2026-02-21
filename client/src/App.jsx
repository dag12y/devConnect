import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
            <Toaster richColors />
        </>
    );
}

export default App;
