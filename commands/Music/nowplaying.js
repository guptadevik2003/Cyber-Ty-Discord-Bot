const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const npSong = player.queue.current

    const nowEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setTitle(npSong.title)
        .setURL(npSong.uri)
        .setDescription(`**Duration:** ${await client.MSFormatter(npSong.duration)}\n` +
                        `**Requested By:** <@${npSong.requester.id}>`)
        .setThumbnail(npSong.thumbnail)

    message.reply({ embeds: [nowEmbed] })

}

module.exports.help = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Shows the song currently playing.',
    usage: 'nowplaying'
}
