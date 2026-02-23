import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading, token } = useSelector(function (state) {
        return state.auth;
    });

    if (loading) {
        return null;
    }

    if (!isAuthenticated && !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
