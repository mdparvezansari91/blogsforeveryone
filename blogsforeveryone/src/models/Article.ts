// src/models/Article.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    description: string;
    url: string;
    source: { name: string }; // Ensure this is defined as an object with a name property
    published_at: Date;
    author: string;
    image: string;
    category: string;
    language: string;
    country: string;
}

const ArticleSchema: Schema = new Schema({
    title: { type: String  },
    description: { type: String  },
    url: { type: String  },
    source: { name: { type: String  } }, // Define source as an object with a name property
    published_at: { type: Date  },
    author: { type: String  },
    image: { type: String  },
    category: { type: String  },
    language: { type: String  },
    country: { type: String },
});

// Check if the model already exists to avoid OverwriteModelError
const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;