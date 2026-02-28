import { useEffect, useState } from "react";
import {
    AtSign,
    Briefcase,
    Code,
    Facebook,
    FileText,
    Github,
    Globe,
    Instagram,
    Linkedin,
    MapPin,
    Youtube,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    createOrUpdateProfile,
    loadMyProfile,
} from "../../redux/features/profile/profile";

const statusOptions = [
    "Developer",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Student or Learning",
    "Instructor",
    "Intern",
    "Other",
];

const initialFormData = {
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    youtube: "",
    x: "",
    facebook: "",
    linkedin: "",
    instagram: "",
};

function IconInput({
    icon: Icon,
    className = "",
    ...props
}) {
    return (
        <div className="relative">
            <Icon
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
                {...props}
                className={`w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${className}`}
            />
        </div>
    );
}

export default function CreateProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = location.pathname === "/edit-profile";
    const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const { loading, myProfile } = useSelector(function (state) {
        return state.profile;
    });

    useEffect(function () {
        document.title = isEditMode ? "Edit Profile" : "Create Profile";
    }, [isEditMode]);

    useEffect(
        function () {
            if (isEditMode && !myProfile) {
                dispatch(loadMyProfile());
            }
        },
        [dispatch, isEditMode, myProfile],
    );

    useEffect(
        function () {
            if (!myProfile) return;
            const filled = {
                status: myProfile.status || "",
                company: myProfile.company || "",
                website: myProfile.website || "",
                location: myProfile.location || "",
                skills: Array.isArray(myProfile.skills)
                    ? myProfile.skills.join(", ")
                    : "",
                githubusername: myProfile.githubusername || "",
                bio: myProfile.bio || "",
                youtube: myProfile.social?.youtube || "",
                x: myProfile.social?.x || "",
                facebook: myProfile.social?.facebook || "",
                linkedin: myProfile.social?.linkedin || "",
                instagram: myProfile.social?.instagram || "",
            };
            setFormData(filled);
            if (Object.values(myProfile.social || {}).some(Boolean)) {
                setDisplaySocialInputs(true);
            }
        },
        [myProfile],
    );

    function onChange(event) {
        setFormData(function (prev) {
            return { ...prev, [event.target.name]: event.target.value };
        });
    }

    function onSubmit(event) {
        event.preventDefault();
        dispatch(createOrUpdateProfile(formData, navigate));
    }

    return (
        <section className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditMode
                                ? "Update Your Profile"
                                : "Create Your Profile"}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Add your professional details so others can find and connect with you.
                        </p>
                    </div>
                    <Link
                        to="/profile"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                        Back to Profile
                    </Link>
                </div>

                <form className="space-y-5" onSubmit={onSubmit}>
                    <div>
                        <label
                            htmlFor="status"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Professional Status <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Briefcase
                                size={16}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={onChange}
                                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            >
                                <option value="">Select current status</option>
                                {statusOptions.map(function (option) {
                                    return (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="company"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Company
                            </label>
                            <IconInput
                                icon={Briefcase}
                                id="company"
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={onChange}
                                placeholder="Company or organization"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="website"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Website
                            </label>
                            <IconInput
                                icon={Globe}
                                id="website"
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={onChange}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Location
                            </label>
                            <IconInput
                                icon={MapPin}
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={onChange}
                                placeholder="City, State"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="githubusername"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                GitHub Username
                            </label>
                            <IconInput
                                icon={Github}
                                id="githubusername"
                                type="text"
                                name="githubusername"
                                value={formData.githubusername}
                                onChange={onChange}
                                placeholder="your-github-handle"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="skills"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Skills <span className="text-red-500">*</span>
                        </label>
                        <IconInput
                            icon={Code}
                            id="skills"
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={onChange}
                            placeholder="React, Node.js, MongoDB, Docker"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Use comma separated values.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="bio"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Bio
                        </label>
                        <div className="relative">
                            <FileText
                                size={16}
                                className="pointer-events-none absolute left-3 top-3 text-gray-400"
                            />
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={onChange}
                                rows={4}
                                placeholder="Tell us about yourself..."
                                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <button
                            type="button"
                            onClick={function () {
                                setDisplaySocialInputs(function (prev) {
                                    return !prev;
                                });
                            }}
                            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                        >
                            {displaySocialInputs ? "Hide Social Links" : "Add Social Links"}
                        </button>

                        {displaySocialInputs ? (
                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <IconInput
                                    icon={AtSign}
                                    type="url"
                                    name="x"
                                    value={formData.x}
                                    onChange={onChange}
                                    placeholder="X URL"
                                />
                                <IconInput
                                    icon={Facebook}
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={onChange}
                                    placeholder="Facebook URL"
                                />
                                <IconInput
                                    icon={Linkedin}
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={onChange}
                                    placeholder="LinkedIn URL"
                                />
                                <IconInput
                                    icon={Instagram}
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={onChange}
                                    placeholder="Instagram URL"
                                />
                                <div className="sm:col-span-2">
                                    <IconInput
                                        icon={Youtube}
                                        type="url"
                                        name="youtube"
                                        value={formData.youtube}
                                        onChange={onChange}
                                        placeholder="YouTube URL"
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading
                                ? "Saving..."
                                : isEditMode
                                  ? "Update Profile"
                                  : "Create Profile"}
                        </button>
                        <Link
                            to="/profile"
                            className="rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
