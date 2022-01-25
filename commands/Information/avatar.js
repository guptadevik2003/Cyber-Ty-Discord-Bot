const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const avatarEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `${user.username}'s Avatar`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`[PNG](${user.avatarURL({ format: 'png', size: 4096 })} 'PNG') | [JPEG](${user.avatarURL({ format: 'jpeg', size: 4096 })} 'JPEG') | [WEBP](${user.avatarURL({ format: 'webp', size: 4096 })} 'WEBP') | [GIF (optional)](${user.avatarURL({ format: 'gif', size: 4096 })} 'GIF')`)
        .setImage(user.avatarURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

    message.channel.send({ embeds: [avatarEmbed] })

}

module.exports.help = {
    name: 'avatar',
    aliases: ['av'],
    description: 'Displays the avatar of the user.',
    usage: 'avatar'
}
