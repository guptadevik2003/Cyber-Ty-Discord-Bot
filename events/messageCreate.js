const guildSchema = require('../schemas/guild')
const { botPrefix } = require('../config.json')

// Other Modules
const chatbotSchema = require('../schemas/chatbot')
const messageChatbot = require('../otherFunctions/messageChatbot')

const countingSchema = require('../schemas/counting')
const messageCounting = require('../otherFunctions/messageCounting')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {


        // if bot or DM return
        if (message.author.bot || message.channel.type === 'DM') return;


        // setting prefix
        let prefix
        let guildData = await guildSchema.findOne({ guildId: message.guildId })
        if (!guildData) {
            const guildName = client.guilds.cache.get(message.guildId).name
            let newGuildData = await new guildSchema({
                guildName: guildName,
                guildId: message.guildId,
                botPrefix: botPrefix
            })
            await newGuildData.save().catch(err => console.log(err))
            prefix = newGuildData.botPrefix
        } else {
            prefix = guildData.botPrefix
        }


        // Bot Mention
        if (message.content === `<@!${client.user.id}>`) {
            return message.reply(`The Prefix of this server is \`${prefix}\``)
        }
        

        // Command
        let messageArray = message.content.split(" ")
        let cmd = messageArray[0]
        let args = messageArray.slice(1)

        let commands = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
        if (commands) {
            if (message.content.startsWith(prefix)) {
                return commands.run({ client, message, args, prefix })
            }
        }


        // Chatbot
        const chatbotChannel = await chatbotSchema.findOne({ channelId: message.channelId })
        if (chatbotChannel) {
            return await messageChatbot({ client, message, chatbotChannel })
        }


        // Counting
        const countingChannel = await countingSchema.findOne({ channelId: message.channelId })
        if (countingChannel) {
            return await messageCounting({ client, message, countingChannel })
        }


    }
}
