const Chatbot = require('../../schemas/chatbot')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Manage Channels** or **Manage Server** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args[0]) return message.reply(`${client.uncheckEmoji} **Mention a Channel** or **Enter Channel ID**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const providedChannelId = args[0].replace('<', '').replace('#', '').replace('>', '')

    const prvdChannel = client.channels.cache.get(providedChannelId)
    if (!prvdChannel) return message.reply(`${client.uncheckEmoji} Please provide a Valid **Text Channel**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (prvdChannel.type !== 'GUILD_TEXT') return message.reply(`${client.uncheckEmoji} Please provide a Valid **Text Channel**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const guildName = client.guilds.cache.get(message.guildId).name

    let chatbotData = await Chatbot.findOne({ guildId: message.guildId })
    if (chatbotData) {

        chatbotData = await Chatbot.findOneAndUpdate({ guildId: message.guildId }, {
            guildName: guildName,
            channelId: prvdChannel.id,
            setById: message.author.id
        })

        const updateEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Channel Updated`, iconURL: `${client.user.displayAvatarURL()}` })
            .setThumbnail(`https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif`)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .addField(`Channel Updated in Database!`, `• Old Channel: **<#${chatbotData.channelId}>**\n• New Channel: **<#${prvdChannel.id}>**\n• Server: **${guildName}**\n• Set By: **<@${message.author.id}>**`, false)

        message.reply({ embeds: [updateEmbed] })

    } else {

        chatbotData = await new Chatbot({
            guildName: guildName,
            guildId: message.guildId,
            channelId: prvdChannel.id,
            setById: message.author.id
        })
        await chatbotData.save().catch(err => console.log(err))

        const createEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Channel Added`, iconURL: `${client.user.displayAvatarURL()}` })
            .setThumbnail(`https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif`)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .addField(`Channel Added to Database!`, `• Channel: **<#${chatbotData.channelId}>**\n• Server: **${chatbotData.guildName}**\n• Set By: **<@${chatbotData.setById}>**`, false)

        message.reply({ embeds: [createEmbed] })

    }

}

module.exports.help = {
    name: 'setchannel',
    aliases: [],
    description: 'Set a channel for Cyber Ty\'s Chatbot feature.',
    usage: 'setchannel <#channel / channelID>'
}
