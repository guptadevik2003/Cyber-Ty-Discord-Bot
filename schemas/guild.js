const { Schema, model } = require('mongoose')

const guildSchema = new Schema({

    guildName: {
        type: String,
    },
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    botPrefix: {
        type: String,
        required: true,
    },

}, { timestamps: true })

module.exports = model('Guild', guildSchema, 'guilds')
