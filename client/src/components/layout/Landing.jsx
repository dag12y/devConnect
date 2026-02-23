import { Link } from "react-router-dom";
import { Code2, Users, TrendingUp, MessageSquare } from "lucide-react";
import {useSelector} from 'react-redux'

export default function Landing() {
    const isAuthenticated = useSelector(function (state) {
        return state.auth.isAuthenticated;
    });
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                    <p className="text-xl mb-4">
                        Explore your profile, share updates, and connect with
                        other developers.
                    </p>
                    <Link
                        to="/dashboard"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors mt-6 inline-block"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center text-white">
                    <div className="flex justify-center mb-6">
                        <Code2 className="w-24 h-24 text-blue-400" />
                    </div>
                    <h1 className="text-6xl font-bold mb-6">DevConnect</h1>
                    <p className="text-2xl mb-4">
                        Create a developer profile/portfolio,
                    </p>
                    <p className="text-2xl mb-8">
                        share posts and get help from other developers
                    </p>

                    <div className="flex gap-4 justify-center mt-12">
                        <Link
                            to="/register"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/login"
                            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20 text-white">
                    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
                        <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="text-xl font-bold mb-3">
                            Developer Profiles
                        </h3>
                        <p className="text-gray-300">
                            Create a comprehensive profile showcasing your
                            skills, experience, and education
                        </p>
                    </div>

                    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="text-xl font-bold mb-3">
                            Share & Connect
                        </h3>
                        <p className="text-gray-300">
                            Post updates, share knowledge, and engage with the
                            developer community
                        </p>
                    </div>

                    <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg text-center">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                        <h3 className="text-xl font-bold mb-3">
                            GitHub Integration
                        </h3>
                        <p className="text-gray-300">
                            Connect your GitHub account and showcase your latest
                            repositories
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
