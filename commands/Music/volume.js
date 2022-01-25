module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args[0]) return message.reply(`${client.uncheckEmoji} Enter a number from **0** to **200**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if(isNaN(args[0])) return message.reply(`${client.uncheckEmoji} Enter a valid number from **0** to **200**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if(args[0] < 0) return message.reply(`${client.uncheckEmoji} Volume needs to be more than **0**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if(args[0] > 200) return message.reply(`${client.uncheckEmoji} Volume needs to be less than **200**.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    try {

        player.setVolume(args[0])
        if (args[0] == 0) {
            return message.reply(`:mute: Volume set to **${args[0]}%**`)
        }
        else if (args[0] >= 1 && args[0] <= 100) {
            return message.reply(`:sound: Volume set to **${args[0]}%**`)
        }
        else if (args[0] > 100) {
            return message.reply(`:loud_sound: Volume set to **${args[0]}%**`)
        }

    } catch (err) {

        console.log(err)
        return message.reply(`${client.uncheckEmoji} Damnit An Error Occured.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

    }

}

module.exports.help = {
    name: 'volume',
    aliases: ['vol'],
    description: 'Sets the volume of the song (0-200).',
    usage: 'volume <69>'
}
