const premium = require('../chatbot/premium')
const basic = require('../chatbot/basic')

module.exports = async ({ client, message, chatbotChannel }) => {

    if (chatbotChannel.premium === 'yes') {

        message.channel.sendTyping()

        const DevikGupta = await premium.DevikGupta(client, message)
        if (!DevikGupta.response) {

            const DevikGuptaAd = await premium.DevikGuptaAd(client, message)
            if (!DevikGuptaAd.response) {
                return message.reply(`I can't even tell what you're saying, maybe an error occured.`)
            }
            if (DevikGuptaAd.response) {
                return message.reply(DevikGuptaAd.response)
            }
        }
        if (DevikGupta.response) {
            return message.reply(DevikGupta.response)
        }

    }

    if (chatbotChannel.premium === 'no') {

        message.channel.sendTyping()

        const PGamerX = await basic.PGamerX(client, message)
        if (!PGamerX.response) {

            const MonkeDev = await basic.MonkeDev(client, message)
            if (!MonkeDev.response) {
                return message.reply(`An error has occured.`)
            }
            if (MonkeDev.response) {
                return message.reply(MonkeDev.response)
            }
        }
        if (PGamerX.response) {
            return message.reply(PGamerX.response)
        }

    }

}
