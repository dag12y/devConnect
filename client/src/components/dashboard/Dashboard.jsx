import { useEffect } from "react";
import {loadMyProfile} from "../../redux/features/profile/profile"
import { useDispatch } from "react-redux";

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = "Dashboard";
        dispatch(loadMyProfile());
    }, []);
    return <div className="text-xl font-bold ">Dashboard</div>;
}
