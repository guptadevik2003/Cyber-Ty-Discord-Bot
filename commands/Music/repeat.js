module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args[0]) return message.reply(`${client.uncheckEmoji} You didn't provide a repeat mode\n\`${prefix}repeat off / song / queue\``)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (args[0] === 'off') {

        player.setTrackRepeat(false)
        player.setQueueRepeat(false)
        message.reply(`${client.checkEmoji} Turned off repeating.`)

    }
    else if (args[0] === 'song' || args[0] === 'track') {

        player.setTrackRepeat(true)
        message.reply(`${client.checkEmoji} Repeating this song, you like it ig.`)
        
    }
    else if (args[0] === 'queue' || args[0] === 'playlist') {
        
        player.setQueueRepeat(true)
        message.reply(`${client.checkEmoji} I will repeat this queue.`)

    }
    else {

        message.reply(`${client.uncheckEmoji} You provided the wrong repeat mode\n\`${prefix}repeat off / song / queue\``)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

    }

}

module.exports.help = {
    name: 'repeat',
    aliases: [],
    description: 'Repeats a song / queue infinitely.',
    usage: 'repeat <off | song | queue>'
}
