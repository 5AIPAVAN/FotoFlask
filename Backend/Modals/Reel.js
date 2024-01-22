const mongoose = require("mongoose");

const Reelschema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    Reaction1: {
        type: Array,
        default:0
    },
    Reaction2: {
        type: Array,
        default:0
    },
    Reaction3: {
        type: Array,
        default:0
    },
    Reaction4: {
        type: Array,
        default:0
    },
    Reaction5: {
        type: Array,
        default:0
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        comment: {
            type: String
        }
    }]



})

module.exports = mongoose.model('Reel', Reelschema);