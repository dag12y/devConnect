import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        name: String,
        avatar: String,

        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],

        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },
                name: String,
                avatar: String,
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true },
);

export default mongoose.model("Post", postSchema);
