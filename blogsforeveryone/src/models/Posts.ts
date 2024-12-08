import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    headerimage:{
        type:String
    },
    title:{
        type:String,
    },
    content: {
        type: Object,
    },
})


export default mongoose.models.Posts || mongoose.model("Posts", postsSchema)