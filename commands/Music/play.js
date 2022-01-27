const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const permConnect = voiceChannel.permissionsFor(client.user).has('CONNECT')
    if (!permConnect) return message.reply(`${client.uncheckEmoji} I don't have enough permissions to connect to <#${voiceChannel.id}>, missing **Connect** permission.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const permSpeak = voiceChannel.permissionsFor(client.user).has('SPEAK')
    if (!permSpeak) return message.reply(`${client.uncheckEmoji} I can connect... but can't play, missing **Speak** permission.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args.length) return message.reply(`${client.uncheckEmoji} No Song Name/URL is provided.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const searchQuery = args.join(' ')

    let res
    try {
        res = await client.handleErela.search(searchQuery, message.author)
        if (res.loadType === 'LOAD_FAILED') throw res.exception
    } catch (err) {
        console.log(err)
        return message.channel.send(`${client.uncheckEmoji} Damnit An Error Occured.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })
    }

    if (res.loadType === 'NO_MATCHES') return message.channel.send(`${client.uncheckEmoji} No tracks were found with this query.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    
    // If no player then creating a player and connecting to it
    let player = client.handleErela.players.get(message.guildId)
    if (!player) {

        player = client.handleErela.create({
            guild: message.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: message.channel.id,
            selfDeafen: true
        })

        try {
            player.connect()
        } catch (err) {
            return message.channel.send(`${client.uncheckEmoji} Damnit An Error Occured.`)
            .then(msg => { setTimeout(() => msg.delete(), 6969) })
        }

    }

    if (res.loadType === 'PLAYLIST_LOADED') {

        res.tracks.forEach((track) => {
            player.queue.add(track)
        })

        const playlistEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Added Playlist to Queue` })
            .setTitle(res.playlist.name)
            .setURL(searchQuery)
            .setDescription(`**Duration:** ${await client.MSFormatter(res.playlist.duration)} <${res.tracks.length} Songs>\n` +
                            `**Requested By:** <@${res.playlist.selectedTrack ? res.playlist.selectedTrack.requester.id : message.author.id}>`)
            .setThumbnail(res.playlist.selectedTrack ? res.playlist.selectedTrack.thumbnail : 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')

        message.channel.send({ embeds: [playlistEmbed] })

        const alreadyQueue = player.queue.size !== res.tracks.length - 1
        if (!player.playing && !player.paused && !alreadyQueue) {
            player.play();
        }

    } else {

        player.queue.add(res.tracks[0])

        const trackEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Added Track to Queue` })
            .setTitle(res.tracks[0].title)
            .setURL(res.tracks[0].uri ? res.tracks[0].uri : searchQuery)
            .setDescription(`**Duration:** ${await client.MSFormatter(res.tracks[0].duration)}\n` +
                            `**Requested By:** <@${res.tracks[0].requester.id}>`)
            .setThumbnail(res.tracks[0].thumbnail ? res.tracks[0].thumbnail : 'https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png')

        message.channel.send({ embeds: [trackEmbed] })

        if (!player.playing && !player.paused && !player.queue.size) {
            player.play();
        }

    }

}

module.exports.help = {
    name: 'play',
    aliases: ['p'],
    description: 'Play or add songs using song name / URL.',
    usage: 'play <songName / URL>'
}
