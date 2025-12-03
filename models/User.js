import mongoose from 'mongoose';

// Embedded (nested) profile sub-document to demonstrate nested relationships
const profileSchema = new mongoose.Schema(
    {
        bio: {
            type: String,
            trim: true,
            maxlength: 200,
        },
        age: {
            type: Number,
            min: 0,
        },
        website: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false, // don't create a separate _id for the nested document
    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // Nested (embedded) relationship: profile is stored inside the User document
        profile: {
            type: profileSchema,
            default: {},
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);