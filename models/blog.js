const { Schema, model, mongoose } = require("mongoose");
const User = require("./user");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true})

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog;