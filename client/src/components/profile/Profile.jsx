import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
    getCurrentProfile,
    createOrUpdateProfile,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    deleteProfile,
} from "../services/api";
import { ProfileForm } from "../components/ProfileForm";
import { ExperienceForm } from "../components/ExperienceForm";
import { EducationForm } from "../components/EducationForm";
import {
    User,
    Briefcase,
    GraduationCap,
    Trash2,
    Plus,
    AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getCurrentProfile();
            setProfile(data.success ? data.data : null);
            setError(null);
        } catch (err) {
            if (err.errors?.[0]?.msg === "There is no profile for this user") {
                setProfile(null);
                setShowProfileForm(true);
            } else {
                setError("Failed to load profile");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleProfileSubmit = async (profileData) => {
        try {
            await createOrUpdateProfile(profileData);
            await fetchProfile();
            setShowProfileForm(false);
            toast.success("Profile saved successfully!");
        } catch (err) {
            throw err;
        }
    };

    const handleAddExperience = async (experienceData) => {
        try {
            await addExperience(experienceData);
            await fetchProfile();
            setShowExperienceForm(false);
            toast.success("Experience added successfully!");
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteExperience = async (expId) => {
        if (
            window.confirm("Are you sure you want to delete this experience?")
        ) {
            try {
                await deleteExperience(expId);
                await fetchProfile();
                toast.success("Experience deleted");
            } catch (err) {
                console.error("Error deleting experience:", err);
                toast.error("Failed to delete experience");
            }
        }
    };

    const handleAddEducation = async (educationData) => {
        try {
            await addEducation(educationData);
            await fetchProfile();
            setShowEducationForm(false);
            toast.success("Education added successfully!");
        } catch (err) {
            throw err;
        }
    };

    const handleDeleteEducation = async (eduId) => {
        if (window.confirm("Are you sure you want to delete this education?")) {
            try {
                await deleteEducation(eduId);
                await fetchProfile();
                toast.success("Education deleted");
            } catch (err) {
                console.error("Error deleting education:", err);
                toast.error("Failed to delete education");
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure? This action cannot be undone!")) {
            try {
                await deleteProfile();
                toast.success("Account deleted");
                navigate("/");
            } catch (err) {
                console.error("Error deleting account:", err);
                toast.error("Failed to delete account");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600">
                        Manage your profile information
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {!profile && !showProfileForm && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            No Profile Yet
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Create your profile to get started
                        </p>
                        <button
                            onClick={() => setShowProfileForm(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Create Profile
                        </button>
                    </div>
                )}

                {showProfileForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {profile ? "Edit Profile" : "Create Profile"}
                        </h2>
                        <ProfileForm
                            profile={profile}
                            onSubmit={handleProfileSubmit}
                            onCancel={() => setShowProfileForm(false)}
                        />
                    </div>
                )}

                {profile && !showProfileForm && (
                    <>
                        {/* Profile Info */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <User className="w-6 h-6" />
                                    Profile Information
                                </h2>
                                <button
                                    onClick={() => setShowProfileForm(true)}
                                    className="text-blue-500 hover:text-blue-600 font-semibold"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="space-y-3 text-gray-700">
                                <div>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    {profile.status}
                                </div>
                                {profile.company && (
                                    <div>
                                        <span className="font-semibold">
                                            Company:
                                        </span>{" "}
                                        {profile.company}
                                    </div>
                                )}
                                {profile.location && (
                                    <div>
                                        <span className="font-semibold">
                                            Location:
                                        </span>{" "}
                                        {profile.location}
                                    </div>
                                )}
                                {profile.website && (
                                    <div>
                                        <span className="font-semibold">
                                            Website:
                                        </span>{" "}
                                        <a
                                            href={profile.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            {profile.website}
                                        </a>
                                    </div>
                                )}
                                {profile.bio && (
                                    <div>
                                        <span className="font-semibold">
                                            Bio:
                                        </span>{" "}
                                        {profile.bio}
                                    </div>
                                )}
                                {profile.skills.length > 0 && (
                                    <div>
                                        <span className="font-semibold">
                                            Skills:
                                        </span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {profile.skills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Briefcase className="w-6 h-6" />
                                    Experience
                                </h2>
                                <button
                                    onClick={() =>
                                        setShowExperienceForm(
                                            !showExperienceForm,
                                        )
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Experience
                                </button>
                            </div>

                            {showExperienceForm && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <ExperienceForm
                                        onSubmit={handleAddExperience}
                                        onCancel={() =>
                                            setShowExperienceForm(false)
                                        }
                                    />
                                </div>
                            )}

                            {profile.experience &&
                            profile.experience.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.experience.map((exp) => (
                                        <div
                                            key={exp._id}
                                            className="border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-gray-700">
                                                        {exp.company}
                                                    </p>
                                                    {exp.location && (
                                                        <p className="text-gray-600 text-sm">
                                                            {exp.location}
                                                        </p>
                                                    )}
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {new Date(
                                                            exp.from,
                                                        ).toLocaleDateString()}{" "}
                                                        -{" "}
                                                        {exp.current
                                                            ? "Present"
                                                            : new Date(
                                                                  exp.to,
                                                              ).toLocaleDateString()}
                                                    </p>
                                                    {exp.description && (
                                                        <p className="text-gray-700 mt-2">
                                                            {exp.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteExperience(
                                                            exp._id,
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-600 p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    No experience added yet
                                </p>
                            )}
                        </div>

                        {/* Education Section */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6" />
                                    Education
                                </h2>
                                <button
                                    onClick={() =>
                                        setShowEducationForm(!showEducationForm)
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Education
                                </button>
                            </div>

                            {showEducationForm && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <EducationForm
                                        onSubmit={handleAddEducation}
                                        onCancel={() =>
                                            setShowEducationForm(false)
                                        }
                                    />
                                </div>
                            )}

                            {profile.education &&
                            profile.education.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.education.map((edu) => (
                                        <div
                                            key={edu._id}
                                            className="border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {edu.school}
                                                    </h3>
                                                    <p className="text-gray-700">
                                                        {edu.degree}
                                                    </p>
                                                    <p className="text-gray-600">
                                                        {edu.fieldofstudy}
                                                    </p>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {new Date(
                                                            edu.from,
                                                        ).toLocaleDateString()}{" "}
                                                        -{" "}
                                                        {edu.current
                                                            ? "Present"
                                                            : new Date(
                                                                  edu.to,
                                                              ).toLocaleDateString()}
                                                    </p>
                                                    {edu.description && (
                                                        <p className="text-gray-700 mt-2">
                                                            {edu.description}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteEducation(
                                                            edu._id,
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-600 p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    No education added yet
                                </p>
                            )}
                        </div>

                        {/* Delete Account */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-red-700 mb-2">
                                Danger Zone
                            </h2>
                            <p className="text-gray-700 mb-4">
                                Delete your account and all associated data.
                                This action cannot be undone.
                            </p>
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                                <Trash2 className="w-5 h-5" />
                                Delete My Account
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
