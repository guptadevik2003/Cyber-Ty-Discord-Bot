const { MessageEmbed } = require('discord.js')
const chatbotSchema = require('../../schemas/chatbot')
const guildSchema = require('../../schemas/guild')
const { botOwnerId } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (message.author.id !== botOwnerId) return message.reply(`${client.uncheckEmoji} Only the Owner of this bot can run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const chatbotArray = await chatbotSchema.find()
    const guildArray = await guildSchema.find()
    
    if (args[0] === 'basic') {
        await sendChatbots(args[0])
    }
    else if (args[0] === 'premium') {
        await sendChatbots(args[0])
    }
    else if (args[0] === 'extra') { // Finished
        await sendExtraChatbotEmbed()
    }
    else if (args[0] === 'delete') { // Finished
        await deleteChatbot(args[1])
    }
    else {
        message.reply(`${prefix}chatbots basic\n${prefix}chatbots premium\n${prefix}chatbots extra\n${prefix}chatbots delete <guildId>`)
    }

    async function sendChatbots(chatbotType) {

        let filteredCBs = []
        if (chatbotType === 'basic') {
            filteredCBs = chatbotArray.filter(cb => cb.premium === 'no')
        } else if (chatbotType === 'premium') {
            filteredCBs = chatbotArray.filter(cb => cb.premium === 'yes')
        }

        let CBFormatted = ``
        filteredCBs.forEach(CB => {
            CBFormatted += `**[\`${filteredCBs.indexOf(CB) + 1}\`] │ ${CB.guildName.substring(0,25)} │ ${CB.guildId} │ ${CB.premium === 'no' ? 'Basic' : 'Premium'}**\n\n`
        })

        const chatbotEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `${filteredCBs.length} ${chatbotType.charAt(0).toUpperCase() + chatbotType.slice(1)} Chatbots`, iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription(CBFormatted)
            .setTimestamp()
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })


        message.reply({ embeds: [chatbotEmbed] })

    }

    async function sendExtraChatbotEmbed() {
        
        const guildArrayIds = []
        guildArray.forEach(guild => {
            guildArrayIds.push(guild.guildId)
        })
        
        let extraChatbots = ``
        let extraChatbotsCount = 0
        chatbotArray.forEach(chatbot => {
            if (!guildArrayIds.includes(chatbot.guildId)) {
                extraChatbotsCount += 1
                extraChatbots += `**${chatbot.guildName.substring(0,25)} │ ${chatbot.guildId} │ ${chatbot.premium === 'no' ? 'Basic' : 'Premium'}**\n\n`
            }
        })

        const extraEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `${extraChatbotsCount} Extra Chatbots`, iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription(extraChatbots)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

        if (extraChatbotsCount > 0) {
            message.reply({ embeds: [extraEmbed] })
        } else {
            message.reply(`${client.uncheckEmoji} No Extra Chatbots.`)
        }

    }

    async function deleteChatbot(guildId) {
        try {

            let deleted = await chatbotSchema.findOneAndDelete({ guildId: guildId })
            message.reply(`Deleted chatbot for **${deleted.guildName}**`)

        } catch (err) {

            message.reply(`${client.uncheckEmoji} An Error occured while Deleting.`)
            console.log(err)

        }
    }

}

module.exports.help = {
    name: 'chatbots',
    aliases: []
}
