import { useEffect, useState } from "react";
import {
    AtSign,
    Briefcase,
    Facebook,
    Github,
    Globe,
    GraduationCap,
    Instagram,
    Linkedin,
    MapPin,
    Youtube,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import {
    addEducation,
    addExperience,
    deleteAccount,
    deleteEducation,
    deleteExperience,
    loadGithubRepos,
    loadMyProfile,
    loadProfileByUserId,
} from "../../redux/features/profile/profile";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, myProfile, viewedProfile, repos, reposLoading, reposError, error } = useSelector(function (state) {
        return state.profile;
    });
    const profile = id ? viewedProfile : myProfile;
    const isViewingOtherProfile = Boolean(id);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [experienceForm, setExperienceForm] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });
    const [educationForm, setEducationForm] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });
    const githubRepos = Array.isArray(repos) ? repos : [];
    const socialIcons = {
        youtube: Youtube,
        x: AtSign,
        facebook: Facebook,
        linkedin: Linkedin,
        instagram: Instagram,
    };

    useEffect(() => {
        document.title = "Profile";
        if (isViewingOtherProfile) {
            dispatch(loadProfileByUserId(id));
            return;
        }
        dispatch(loadMyProfile());
    }, [dispatch, id, isViewingOtherProfile]);

    useEffect(
        function () {
            dispatch(loadGithubRepos(profile?.githubusername || ""));
        },
        [dispatch, profile?.githubusername],
    );

    function handleExperienceChange(event) {
        const { name, type, checked, value } = event.target;
        setExperienceForm(function (previous) {
            return {
                ...previous,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    function handleEducationChange(event) {
        const { name, type, checked, value } = event.target;
        setEducationForm(function (previous) {
            return {
                ...previous,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    }

    async function handleExperienceSubmit(event) {
        event.preventDefault();
        if (!experienceForm.title || !experienceForm.company || !experienceForm.from) {
            toast.error("Title, company and from date are required");
            return;
        }
        const success = await dispatch(addExperience(experienceForm));
        if (!success) return;
        setExperienceForm({
            title: "",
            company: "",
            location: "",
            from: "",
            to: "",
            current: false,
            description: "",
        });
        setShowExperienceForm(false);
    }

    async function handleEducationSubmit(event) {
        event.preventDefault();
        if (
            !educationForm.school ||
            !educationForm.degree ||
            !educationForm.fieldofstudy ||
            !educationForm.from
        ) {
            toast.error("School, degree, field of study and from date are required");
            return;
        }
        const success = await dispatch(addEducation(educationForm));
        if (!success) return;
        setEducationForm({
            school: "",
            degree: "",
            fieldofstudy: "",
            from: "",
            to: "",
            current: false,
            description: "",
        });
        setShowEducationForm(false);
    }

    async function handleDeleteExperience(expId) {
        const confirmed = window.confirm("Delete this experience?");
        if (!confirmed) return;
        await dispatch(deleteExperience(expId));
    }

    async function handleDeleteEducation(eduId) {
        const confirmed = window.confirm("Delete this education?");
        if (!confirmed) return;
        await dispatch(deleteEducation(eduId));
    }

    async function handleDeleteAccount() {
        const confirmed = window.confirm(
            "Delete your account permanently? This cannot be undone.",
        );
        if (!confirmed) return;
        const success = await dispatch(deleteAccount());
        if (success) {
            navigate("/");
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-gray-700">
                <ClipLoader color="#3B82F6" size={48} />
                <span className="text-lg font-semibold">Loading profile...</span>
            </div>
        );
    }

    const noMyProfile =
        !loading &&
        !isViewingOtherProfile &&
        !myProfile &&
        (!error || error === "There is no profile for this user");

    if (error && !noMyProfile) {
        return (
            <div className="text-red-600 flex min-h-[50vh] flex-col items-center justify-center gap-3">
                {error}
            </div>
        );
    }

    if (noMyProfile) {
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

    if (isViewingOtherProfile && !profile && !error) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-gray-700">
                <ClipLoader color="#3B82F6" size={48} />
                <span className="text-lg font-semibold">Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    to="/dashboard"
                    className="text-blue-500 hover:text-blue-600 mb-6 inline-block"
                >
                    ← Back to Dashboard
                </Link>
                {!isViewingOtherProfile && (
                    <div className="mb-6 flex justify-end">
                        <Link
                            to="/edit-profile"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            Edit Profile
                        </Link>
                    </div>
                )}

                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow p-8 mb-6">
                    <div className="text-center mb-6">
                        <img
                            src={profile?.user?.avatar}
                            alt={profile?.user?.name || "Profile avatar"}
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.user?.name || "User")}&background=random`;
                            }}
                        />
                        <h1 className="text-3xl font-bold text-gray-900">
                            {profile?.user?.name}
                        </h1>
                        <p className="text-xl text-gray-600 mt-2">
                            {profile?.status}
                        </p>
                        {profile.company && (
                            <p className="text-gray-500">
                                at {profile.company}
                            </p>
                        )}
                        {profile.location && (
                            <div className="flex items-center justify-center gap-2 text-gray-600 mt-2">
                                <MapPin className="w-4 h-4" />
                                <span>{profile.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    {profile.social &&
                        Object.keys(profile.social).length > 0 && (
                            <div className="flex justify-center gap-4 mb-6">
                                {profile.website && (
                                    <a
                                        href={profile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-blue-500 transition-colors"
                                    >
                                        <Globe className="w-6 h-6" />
                                    </a>
                                )}
                                {Object.entries(profile.social).map(
                                    ([platform, url]) => {
                                        if (!url) return null;
                                        const Icon = socialIcons[platform];
                                        if (!Icon) return null;
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-blue-500 transition-colors"
                                            >
                                                <Icon className="w-6 h-6" />
                                            </a>
                                        );
                                    },
                                )}
                            </div>
                        )}

                    {/* Bio */}
                    {profile.bio && (
                        <div className="border-t pt-6">
                            <p className="text-gray-700 text-center">
                                {profile.bio}
                            </p>
                        </div>
                    )}
                </div>

                {/* Skills */}
                {Array.isArray(profile.skills) && profile.skills.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {!isViewingOtherProfile && (
                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Add Experience
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setShowExperienceForm(!showExperienceForm)}
                                    className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                                >
                                    {showExperienceForm ? "Hide" : "Open"}
                                </button>
                            </div>
                            {showExperienceForm && (
                                <form className="space-y-3" onSubmit={handleExperienceSubmit}>
                                    <input
                                        name="title"
                                        value={experienceForm.title}
                                        onChange={handleExperienceChange}
                                        placeholder="Job title"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <input
                                        name="company"
                                        value={experienceForm.company}
                                        onChange={handleExperienceChange}
                                        placeholder="Company"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <input
                                        name="location"
                                        value={experienceForm.location}
                                        onChange={handleExperienceChange}
                                        placeholder="Location"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            name="from"
                                            value={experienceForm.from}
                                            onChange={handleExperienceChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                        <input
                                            type="date"
                                            name="to"
                                            value={experienceForm.to}
                                            onChange={handleExperienceChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            name="current"
                                            checked={experienceForm.current}
                                            onChange={handleExperienceChange}
                                        />
                                        Current Job
                                    </label>
                                    <textarea
                                        name="description"
                                        value={experienceForm.description}
                                        onChange={handleExperienceChange}
                                        rows={3}
                                        placeholder="Description"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors"
                                    >
                                        Save Experience
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Add Education
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => setShowEducationForm(!showEducationForm)}
                                    className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                                >
                                    {showEducationForm ? "Hide" : "Open"}
                                </button>
                            </div>
                            {showEducationForm && (
                                <form className="space-y-3" onSubmit={handleEducationSubmit}>
                                    <input
                                        name="school"
                                        value={educationForm.school}
                                        onChange={handleEducationChange}
                                        placeholder="School"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <input
                                        name="degree"
                                        value={educationForm.degree}
                                        onChange={handleEducationChange}
                                        placeholder="Degree"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <input
                                        name="fieldofstudy"
                                        value={educationForm.fieldofstudy}
                                        onChange={handleEducationChange}
                                        placeholder="Field of study"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            name="from"
                                            value={educationForm.from}
                                            onChange={handleEducationChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                        <input
                                            type="date"
                                            name="to"
                                            value={educationForm.to}
                                            onChange={handleEducationChange}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        />
                                    </div>
                                    <label className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            name="current"
                                            checked={educationForm.current}
                                            onChange={handleEducationChange}
                                        />
                                        Current School
                                    </label>
                                    <textarea
                                        name="description"
                                        value={educationForm.description}
                                        onChange={handleEducationChange}
                                        rows={3}
                                        placeholder="Program description"
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors"
                                    >
                                        Save Education
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {profile.experience && profile.experience.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-6 h-6" />
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {profile.experience.map((exp) => (
                                <div
                                    key={exp._id}
                                    className="border-l-4 border-blue-500 pl-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {exp.title}
                                        </h3>
                                        {!isViewingOtherProfile && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteExperience(exp._id)}
                                                className="rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 font-medium">
                                        {exp.company}
                                    </p>
                                    {exp.location && (
                                        <p className="text-gray-600 text-sm">
                                            {exp.location}
                                        </p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">
                                        {new Date(exp.from).toLocaleDateString(
                                            "en-US",
                                            { month: "short", year: "numeric" },
                                        )}{" "}
                                        -{" "}
                                        {exp.current
                                            ? "Present"
                                            : new Date(
                                                  exp.to,
                                              ).toLocaleDateString("en-US", {
                                                  month: "short",
                                                  year: "numeric",
                                              })}
                                    </p>
                                    {exp.description && (
                                        <p className="text-gray-700 mt-2">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {profile.education && profile.education.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6" />
                            Education
                        </h2>
                        <div className="space-y-6">
                            {profile.education.map((edu) => (
                                <div
                                    key={edu._id}
                                    className="border-l-4 border-green-500 pl-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {edu.school}
                                        </h3>
                                        {!isViewingOtherProfile && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteEducation(edu._id)}
                                                className="rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 font-medium">
                                        {edu.degree}
                                    </p>
                                    <p className="text-gray-600">
                                        {edu.fieldofstudy}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {new Date(edu.from).toLocaleDateString(
                                            "en-US",
                                            { month: "short", year: "numeric" },
                                        )}{" "}
                                        -{" "}
                                        {edu.current
                                            ? "Present"
                                            : new Date(
                                                  edu.to,
                                              ).toLocaleDateString("en-US", {
                                                  month: "short",
                                                  year: "numeric",
                                              })}
                                    </p>
                                    {edu.description && (
                                        <p className="text-gray-700 mt-2">
                                            {edu.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GitHub Repos */}
                {reposLoading && (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                        Loading GitHub repositories...
                    </div>
                )}
                {!reposLoading && reposError && (
                    <div className="bg-white rounded-lg shadow p-6 text-center text-red-600">
                        {reposError}
                    </div>
                )}
                {!reposLoading && !reposError && githubRepos.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Github className="w-6 h-6" />
                            GitHub Repositories
                        </h2>
                        <div className="space-y-4">
                            {githubRepos.map((repo) => (
                                <div
                                    key={repo.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                                >
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
                                    >
                                        {repo.name}
                                    </a>
                                    {repo.description && (
                                        <p className="text-gray-700 mt-2">
                                            {repo.description}
                                        </p>
                                    )}
                                    <div className="flex gap-4 mt-3 text-sm text-gray-500">
                                        {repo.stargazers_count > 0 && (
                                            <span>
                                                ⭐ {repo.stargazers_count}
                                            </span>
                                        )}
                                        {repo.watchers_count > 0 && (
                                            <span>
                                                👁 {repo.watchers_count}
                                            </span>
                                        )}
                                        {repo.forks_count > 0 && (
                                            <span>🔱 {repo.forks_count}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {!isViewingOtherProfile && (
                    <div className="bg-white rounded-lg border border-red-200 p-6 mt-6">
                        <h2 className="text-xl font-bold text-red-700 mb-2">
                            Danger Zone
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Deleting your account removes your profile and user account permanently.
                        </p>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                        >
                            Delete My Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
