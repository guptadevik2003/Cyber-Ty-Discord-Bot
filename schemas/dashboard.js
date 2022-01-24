const { Schema, model } = require('mongoose')

const dashboardSchema = new Schema({

    botUserId: {
        type: String,
        required: true,
        unique: true,
    },
    botUserName: {
        type: String,
    },
    botUserTag: {
        type: String,
    },
    botAvatar: {
        type: String,
    },
    botUptime: {
        type: Number,
    },
    botUptimeUpdatedAt: {
        type: Number,
    },
    botWSPing: {
        type: Number,
    },
    botGuildCount: {
        type: Number,
    },
    botUserCount: {
        type: Number,
    },

}, { timestamps: true })

module.exports = model('Dashboard', dashboardSchema, 'dashboard')
