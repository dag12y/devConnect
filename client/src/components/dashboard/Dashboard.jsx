import { useEffect } from "react";
import { loadMyProfile } from "../../redux/features/profile/profile";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { loading, profile, error } = useSelector(function (state) {
        return state.profile;
    });

    useEffect(() => {
        document.title = "Dashboard";
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

    if (error) {
        return (
            <div className="text-red-600 flex min-h-[50vh] flex-col items-center justify-center gap-3">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="rounded-lg bg-white p-4 shadow">
                <h2 className="text-lg font-semibold">Profile</h2>
                <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
                    {profile ? JSON.stringify(profile, null, 2) : "No profile"}
                </pre>
            </div>
        </div>
    );
}
