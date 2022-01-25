const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const verificationLevels = {
        NONE: 'None',
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: 'High',
        VERY_HIGH: 'Highest'
    }
    async function convertDate(timestamp) {
        const months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        const date = new Date(timestamp)
        const formatted = `${date.getDate()} ` +
                          `${months[date.getMonth()]} ` +
                          `${date.getFullYear()} ` +
                          `${date.getHours()}:` +
                          `${ date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}` }:` +
                          `${ date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}` }`
        return formatted
    }

    const server = client.guilds.cache.get(message.guildId)

    const createdAt = await convertDate(server.createdTimestamp)
    const verifLvl = verificationLevels[server.verificationLevel]
    
    const emojiCount = server.emojis.cache.size
    const boostCount = server.premiumSubscriptionCount
    
    const memberCount = server.memberCount
    const roleCount = server.roles.cache.size
    
    const channels = server.channels.cache
    var guildVoiceC = 0
    var guildTextC = 0
    var guildCategoryC = 0
    channels.forEach(channel => {
        if (channel.type === 'GUILD_VOICE') {
            guildVoiceC += 1
        } else if (channel.type === 'GUILD_TEXT') {
            guildTextC += 1
        } else if (channel.type === 'GUILD_CATEGORY') {
            guildCategoryC += 1
        }
    })

    const serverEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Info for ${server.name}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(`${server.iconURL()}`)
        .setTimestamp()
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .addField(`Server Info`, `• Name: **${server.name}**\n• ID: **${server.id}**\n• Created At: **${createdAt}**`, false)
        .addField(`General Info`, `• Members: **${memberCount}**\n• Roles: **${roleCount}**\n• Owner: **<@${server.ownerId}>**`, true)
        .addField(`Channel Info (${channels.size})`, `• Text: **${guildTextC}**\n• Voice: **${guildVoiceC}**\n• Category: **${guildCategoryC}**`, true)
        .addField(`Other Info`, `• Emoji Count: **${emojiCount}**\n• Boost Count: **${boostCount}**\n• Verification Lvl: **${verifLvl}**`, false)

    message.reply({ embeds: [serverEmbed] })
    
}

module.exports.help = {
    name: 'serverinfo',
    aliases: ['guildinfo'],
    description: 'Shows some info about your server.',
    usage: 'serverinfo'
}
