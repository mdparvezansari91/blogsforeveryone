import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User ', // Assuming you have a User model
    
  },
  content: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content:{
    type:String
  },
  category:{
    type:String
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  comments:[commentSchema]
}
,
{
    timestamps:true

});

export default mongoose.models.BlogsPost ||
  mongoose.model("BlogsPost", blogPostSchema);
