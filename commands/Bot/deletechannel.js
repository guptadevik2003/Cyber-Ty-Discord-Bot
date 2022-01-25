const Chatbot = require('../../schemas/chatbot')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Manage Channels** or **Manage Server** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    let chatbotData = await Chatbot.findOne({ guildId: message.guildId })
    if (!chatbotData) return message.reply(`${client.uncheckEmoji} **No Record Found!** Use \`${prefix}setchannel\` to add a Record.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })


    await Chatbot.findOneAndDelete({ guildId: message.guildId })

    const deleteEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Channel Deleted`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(`https://media.giphy.com/media/26xBIUj4Y6K2LcIz6/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .addField(`Channel Deleted from Database!`, `• Deleted Channel: **<#${chatbotData.channelId}>**\n\nTo reconfigure ${client.user.username} Chatbot,\nUse **\`${prefix}setchannel\`**`, false)

    message.reply({ embeds: [deleteEmbed] })
    
}

module.exports.help = {
    name: 'deletechannel',
    aliases: ['delchannel'],
    description: 'Disable Cyber Ty Chatbot IF added.',
    usage: 'deletechannel'
}
