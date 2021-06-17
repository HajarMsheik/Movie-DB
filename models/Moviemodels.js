
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});
module.exports = mongoose.model('Movies',PostSchema);