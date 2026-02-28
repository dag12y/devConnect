import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, MapPin, Code } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfiles } from "../../redux/features/profile/profile";

export default function Developers() {
    const dispatch = useDispatch();
    const { profiles, loading, error } = useSelector(function (state) {
        return state.profile;
    });

    useEffect(
        function () {
            dispatch(loadProfiles());
        },
        [dispatch],
    );


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="w-8 h-8 text-blue-500" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            Developers
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Browse and connect with developers
                    </p>
                </div>

                {loading ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        Loading developers...
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-red-600">
                        {error}
                    </div>
                ) : profiles.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        No developers found
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((profile) => (
                            <div
                                key={profile._id}
                                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="text-center mb-4">
                                    <img
                                        src={profile.user?.avatar}
                                        alt={profile.user?.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.user?.name || "User")}&background=random`;
                                        }}
                                    />
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {profile.user?.name}
                                    </h2>
                                    <p className="text-gray-600 mb-2">
                                        {profile.status}
                                    </p>
                                    {profile.company && (
                                        <p className="text-gray-500 text-sm">
                                            at {profile.company}
                                        </p>
                                    )}
                                </div>

                                {profile.location && (
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-sm">
                                            {profile.location}
                                        </span>
                                    </div>
                                )}

                                {Array.isArray(profile.skills) && profile.skills.length > 0 && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Code className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm font-semibold text-gray-700">
                                                Skills
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.skills
                                                .slice(0, 5)
                                                .map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            {profile.skills.length > 5 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                                    +{profile.skills.length - 5}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Link
                                    to={`/profile/${profile.user?._id}`}
                                    className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
                                >
                                    View Profile
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
