const { Schema, model } = require('mongoose')

const countingSchema = new Schema({

    guildName: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    channelId: {
        type: String,
        required: true,
        unique: true,
    },
    currentCount: {
        type: Number,
        required: true,
        default: 0,
    },
    setById: {
        type: String,
        required: true,
    },

}, { timestamps: true })

module.exports = model('Counting', countingSchema, 'countings')
