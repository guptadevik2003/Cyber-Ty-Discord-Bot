module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (player.queue.length < 1) return message.reply(`${client.uncheckEmoji} No more songs in Queue.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    try {

        player.play(player.queue[0])
        player.queue.shift()
        return message.reply(`:track_next: Skipped`)

    } catch (err) {

        console.log(err)
        return message.reply(`${client.uncheckEmoji} Damnit An Error Occured.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

    }

}

module.exports.help = {
    name: 'skip',
    aliases: ['s'],
    description: 'Skips to the next song in the queue.',
    usage: 'skip'
}
