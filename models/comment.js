const {Schema, model, mongoose} = require("mongoose")
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;