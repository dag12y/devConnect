import { Link, useNavigate } from "react-router-dom";
import { Code2, Users, LogIn, UserPlus } from "lucide-react";
import { logout } from "../../redux/features/auth/auth";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(function (state) {
        return state.auth.isAuthenticated;
    });
    const loading = useSelector(function (state) {
        return state.auth.loading;
    });

    function handleLogout() {
        dispatch(logout());
        navigate("/login");
    }

    const authLinks = (
        <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
        >
            <LogIn className="w-5 h-5" />
            <span>Logout</span>
        </button>
    );

    const guestLinks = (
        <>
            <Link
                to="/register"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
                <UserPlus className="w-5 h-5" />
                <span>Sign Up</span>
            </Link>
            <Link
                to="/login"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
            </Link>
        </>
    );

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                    >
                        <Code2 className="w-8 h-8" />
                        <span className="text-xl font-bold">DevConnect</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link
                            to="/developers"
                            className={`flex items-center gap-2 hover:text-blue-400 transition-colors `}
                        >
                            <Users className="w-5 h-5" />
                            <span>Developers</span>
                        </Link>

                        {loading ? (
                            <span className="text-gray-400">Loading...</span>
                        ) : isAuthenticated ? (
                            authLinks
                        ) : (
                            guestLinks
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
