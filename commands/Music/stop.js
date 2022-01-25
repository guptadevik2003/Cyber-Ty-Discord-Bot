module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    try {

        player.destroy()
        return message.reply(`${client.checkEmoji} Successfully left <#${voiceChannel.id}>`)

    } catch (err) {

        console.log(err)
        return message.reply(`${client.uncheckEmoji} Damnit An Error Occured.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })
        
    }

}

module.exports.help = {
    name: 'stop',
    aliases: ['leave'],
    description: 'Stops the song playing and leaves VC.',
    usage: 'stop'
}
