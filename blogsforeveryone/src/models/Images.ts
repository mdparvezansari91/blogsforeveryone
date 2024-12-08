import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    //image base64
    data:{
        type: String
    }, 
    postId:{
        type: mongoose.Schema.Types.ObjectId, ref:'Posts'
    }
})


export default mongoose.models.Image || mongoose.model('Image', ImageSchema);