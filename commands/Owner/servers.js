const { MessageEmbed } = require('discord.js')
const { botOwnerId } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (message.author.id !== botOwnerId) return message.reply(`${client.uncheckEmoji} Only the Owner of this bot can run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })
    
    let users = 0
    let guildInfo = ``
    const guilds = client.guilds.cache

    guilds.forEach(guild => {
        users += guild.memberCount
        guildInfo += `${guild.id}: ${guild.name.substring(0,25)} [${guild.memberCount} Users]\n`
    })

    const serversEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `${guilds.size} Servers │ ${users} Users`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`\`\`\`yml\n${guildInfo}\n\`\`\``)
        .setTimestamp()
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

    message.reply({ embeds: [serversEmbed] })

}

module.exports.help = {
    name: 'servers',
    aliases: []
}
