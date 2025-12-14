import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
    {
     title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        index: true,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    tag:{
        type: String,
        default: "",
     },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
},
{ timestamps: true}
);

noteSchema.index({ title: "text",content: "text"});

export default mongoose.model('Note', noteSchema);