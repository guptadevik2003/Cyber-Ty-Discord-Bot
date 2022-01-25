const GuildSchema = require('../../schemas/guild')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Manage Server** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args[0]) return message.reply(`${client.uncheckEmoji} Provide the Prefix you want to set.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const providedPrefix = args[0]
    const guildName = client.guilds.cache.get(message.guildId).name

    await GuildSchema.findOneAndUpdate({ guildId: message.guildId }, {
        guildName: guildName,
        botPrefix: providedPrefix
    })

    const updateEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Custom Prefix`, iconURL: `${client.user.displayAvatarURL()}` })
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .addField(`Updated The Database`, `• Old Prefix: **\`${prefix}\`**\n• New Prefix: **\`${providedPrefix}\`**\n• Server: **${guildName}**`, false)

    message.reply({ embeds: [updateEmbed] })
        
}

module.exports.help = {
    name: 'setprefix',
    aliases: ['prefix'],
    description: 'Sets a custom prefix for each server.',
    usage: 'setprefix <newPrefix>'
}
