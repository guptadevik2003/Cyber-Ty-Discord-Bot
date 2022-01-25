const { MessageEmbed } = require('discord.js')
const { botInviteLink, supportServerLink } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {
    
    const inviteEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Invite ${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setTitle(`Invite ${client.user.username}`)
        .setURL(`${botInviteLink}`)
        .setDescription(`[Support Server](${supportServerLink} 'Support Server')`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

    message.reply({ embeds: [inviteEmbed] })
}

module.exports.help = {
    name: 'invite',
    aliases: [],
    description: 'Invite link to add Cyber Ty to your server.',
    usage: 'invite'
}
