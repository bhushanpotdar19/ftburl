import { Schema, model } from "mongoose";

const linkSchema = new Schema({
    target: {
        type: String,
        required: true
    },
    title: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    views: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }


}, {
    timestamps: true
})

const Link = model('Link', linkSchema);
export default Link
