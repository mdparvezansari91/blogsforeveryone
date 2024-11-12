import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);