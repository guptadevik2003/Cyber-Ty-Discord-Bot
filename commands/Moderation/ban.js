const { MessageEmbed, Permissions } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Ban Members** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const target = message.mentions.users.first() || await client.users.cache.find(u => u.id === args[0])
    if (!target) return message.reply(`${client.uncheckEmoji} **User Not Provided / Cached**\n**Usage:** ${prefix}ban <@${message.author.id}>\n**Usage:** ${prefix}ban ${message.author.id}`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if(target.id === message.author.id) return message.reply(`${client.uncheckEmoji} Okay that's funny but you can't ban yourself.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const targetGuild = message.guild.members.cache.get(target.id)
    try {

        targetGuild.ban()
        message.channel.send(`${client.checkEmoji} <@${targetGuild.id}> has been banned.`)

    } catch (err) {

        message.reply(`${client.uncheckEmoji} Damnit an Error Occured.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

    }

}

module.exports.help = {
    name: 'ban',
    aliases: [],
    description: 'Bans a member from your server.',
    usage: 'ban <@CocoMelon / userID>'
}
