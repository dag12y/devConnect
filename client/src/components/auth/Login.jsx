import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { login } from "../../redux/features/auth/auth";
import { useDispatch ,} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const result = await dispatch(login(formData));
        if (result) {
            setFormData({ email: "", password: "" });
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <LogIn className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sign In
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Sign into your DevConnect account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            value={formData.email}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:text-blue-600 font-semibold"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
