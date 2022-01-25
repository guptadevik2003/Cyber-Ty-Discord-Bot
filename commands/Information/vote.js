const { MessageEmbed } = require('discord.js')
const { topGGVoteLink } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {
    
    const voteEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Vote for ${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`**Top.gg**\n` +
                        `[Click Here](${topGGVoteLink} 'Top.gg Vote')`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

    message.reply({ embeds: [voteEmbed] })
}

module.exports.help = {
    name: 'vote',
    aliases: [],
    description: 'Like Cyber Ty? Vote now :)',
    usage: 'vote'
}
