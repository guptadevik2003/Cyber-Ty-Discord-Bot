const { botOwnerId } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (message.author.id !== botOwnerId) return message.reply(`${client.uncheckEmoji} Only the Owner of this bot can run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (args.length < 2) return message.reply(`${client.uncheckEmoji} \`${prefix}delmsg <channelId> <messageId>\``)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const channel = await client.channels.cache.get(args[0])
    if (!channel) return message.reply(`${client.uncheckEmoji} Can't fetch Channel.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const deleteMessage = await channel.messages.fetch(args[1]).catch(err => {})
    if (!deleteMessage) return message.reply(`${client.uncheckEmoji} Can't fetch Message.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    try {

        deleteMessage.delete()
        message.reply(`${client.checkEmoji} Deleted message!`)
        .then(msg => { setTimeout(() => msg.delete(), 3000) })

    } catch (err) {

        message.reply(`${client.uncheckEmoji} An Error occured while deleting.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

    }

}

module.exports.help = {
    name: 'deletemessage',
    aliases: ['delmessage', 'delmsg']
}
