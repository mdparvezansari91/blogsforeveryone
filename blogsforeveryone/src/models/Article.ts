import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    description: string;
    url: string;
    source: string; // Source is a string
    published_at: Date;
    author?: string; // Optional fields
    image?: string;
    category?: string;
    language?: string;
    country?: string;
}

const ArticleSchema: Schema<IArticle> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    source: { type: String, required: true }, // Source is a string
    published_at: { type: Date, required: true },
    author: { type: String },
    image: { type: String },
    category: { type: String },
    language: { type: String },
    country: { type: String },
}, { timestamps: true });

// Create a TTL index on the createdAt field
ArticleSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 }); // 7 days

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;