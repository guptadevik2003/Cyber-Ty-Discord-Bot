module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (player.queue.length < 1) return message.reply(`${client.uncheckEmoji} No songs in Queue.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    async function shuffle(array) {
        let currentIndex = array.length,  randomIndex
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            [
                array[currentIndex],
                array[randomIndex]
            ] = [
                array[randomIndex],
                array[currentIndex]
            ]
        }
        return array
    }

    const shuffledQueue = await shuffle(player.queue)

    player.queue = shuffledQueue

    message.reply(`${client.checkEmoji} Shuffled the Queue.`)

}

module.exports.help = {
    name: 'shuffle',
    aliases: [],
    description: 'Shuffles the songs of a queue randomly.',
    usage: 'shuffle'
}
