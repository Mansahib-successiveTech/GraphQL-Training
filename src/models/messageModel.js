import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }
)
export const Message = mongoose.model("Message", messageSchema);