const { MessageEmbed } = require('discord.js')
const { dependencies } = require('../../package.json')
const { botInviteLink, supportServerLink, botWebsite } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    const servers = client.guilds.cache
    const channels = client.channels.cache.size
    var users = 0
    for (const s of servers) {
        users += s[1].memberCount
    }

    const discordJS = dependencies['discord.js'].replace('^', 'v')
    const nodeJS = `v${process.versions.node}`
    const erelaJS = dependencies['erela.js'].replace('^', 'v')
    const clientUptime = await client.MSFormatter(client.uptime)
    const memUsage = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    const apiPing = `${client.ws.ping}ms`

    const statsEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Statistics`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`• **[Invite Link](${botInviteLink} 'Invite Link')** • **[Support Server](${supportServerLink} 'Support Server')**\n• **[Website](${botWebsite} 'CyberTy | Your Discord Buddy')** • **[Coming Soon](https://cyberty.mapleclub.top/login 'Coming Soon')**`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setTimestamp()
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .addField(`${client.user.username} Stats`, `• **Users:** ${users}\n• **Servers:** ${servers.size}\n• **Channels:** ${channels}`, false)
        .addField(`Module Stats`, `• **Node.js:** ${nodeJS}\n• **Discord.js:** ${discordJS}\n• **Erela.js:** ${erelaJS}`, false)
        .addField(`Other Stats`, `• **API Latency:** ${apiPing}\n• **RAM Usage:** ${memUsage}\n• **Uptime:** ${clientUptime}`, false)

    message.reply({ embeds: [statsEmbed] })

}

module.exports.help = {
    name: 'stats',
    aliases: ['botstats', 'botinfo'],
    description: 'Returns some details about the bot.',
    usage: 'stats'
}
