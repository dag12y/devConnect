import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { loadMyProfile } from "../../redux/features/profile/profile";

export default function Profile() {
    const dispatch = useDispatch();
    const { loading, profile, error } = useSelector(function (state) {
        return state.profile;
    });

    useEffect(() => {
        document.title = "Profile";
        dispatch(loadMyProfile());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-gray-700">
                <ClipLoader color="#3B82F6" size={48} />
                <span className="text-lg font-semibold">Loading profile...</span>
            </div>
        );
    }

    const noProfile =
        !loading &&
        !profile &&
        (error === "There is no profile for this user" ||
            error === "Failed to load profile");

    if (error && !noProfile) {
        return (
            <div className="text-red-600 flex min-h-[50vh] flex-col items-center justify-center gap-3">
                {error}
            </div>
        );
    }

    if (noProfile) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-gray-700">
                <div className="text-lg font-semibold">No profile yet.</div>
                <Link
                    to="/create-profile"
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                >
                    Create Profile
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="rounded-lg bg-white p-4 shadow">
                <h2 className="text-lg font-semibold">Profile</h2>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
                    {JSON.stringify(profile, null, 2)}
                </pre>
            </div>
        </div>
    );
}
