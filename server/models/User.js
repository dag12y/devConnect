import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: String,
        avatar: String,
    },
    { timestamps: true },
);

const User = mongoose.model("user", UserSchema);
export default User;
