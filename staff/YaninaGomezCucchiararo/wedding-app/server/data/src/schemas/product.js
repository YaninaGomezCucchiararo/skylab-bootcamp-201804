const mongoose = require ('mongoose')

const {Schema, Schema:{ObjectId}} = mongoose


module.exports = new Schema ({
    imgUrl: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    size: {
        type: Number,
        required: true
    },
    
    color: {
        type: String,
        required: true
    },

    ownerId: {
        type: ObjectId,
        ref: 'User'
    }

})

