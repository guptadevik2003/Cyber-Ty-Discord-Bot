const { Permissions } = require('discord.js')
const { botOwnerId } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || message.author.id === botOwnerId
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Manage Messages** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 3000) })

    if (!args[0]) return message.reply(`${client.uncheckEmoji} Enter the Amount of messages to be Cleared.`)
    .then(msg => { setTimeout(() => msg.delete(), 3000) })

    if(isNaN(args[0])) return message.reply(`${client.uncheckEmoji} Enter a valid Number from 1 to 100.`)
    .then(msg => { setTimeout(() => msg.delete(), 3000) })

    if(args[0] > 100) return message.reply(`${client.uncheckEmoji} Limit is 1 - 100 messages.`)
    .then(msg => { setTimeout(() => msg.delete(), 3000) })

    if(args[0] < 1) return message.reply(`${client.uncheckEmoji} Limit is 1 - 100 messages.`)
    .then(msg => { setTimeout(() => msg.delete(), 3000) })

    await message.channel.messages.fetch({ limit: args[0] })
    .then(messages => {

        try {
            message.channel.bulkDelete(messages, true)
        } catch (err) {
            message.channel.send(`${client.uncheckEmoji} Damnit an Error Occured.`)
        }

        message.channel.send(`${client.checkEmoji} Deleted ${args[0]} messages!`)
        .then(msg => { setTimeout(() => msg.delete(), 3000) })
    })

}

module.exports.help = {
    name: 'clear',
    aliases: ['purge'],
    description: 'Clears the amount of messages from a channel.',
    usage: 'clear <amount>'
}
