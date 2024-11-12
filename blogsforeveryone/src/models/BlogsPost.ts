import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content:{
    type:String
  },
  category:{
    type:String
  }
}
,
{
    timestamps:true

});

export default mongoose.models.BlogsPost ||
  mongoose.model("BlogsPost", blogPostSchema);
