const { Schema, model } = require('mongoose')

const chatbotSchema = new Schema({

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
    premium: {
        type: String,
        default: 'no',
    },
    setById: {
        type: String,
        required: true,
    },

}, { timestamps: true })

module.exports = model('Chatbot', chatbotSchema, 'chatbots')
