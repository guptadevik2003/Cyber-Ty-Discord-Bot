const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

// Button Paginator by https://stackoverflow.com/questions/60691780/how-do-you-make-embed-pages-in-discord-js

module.exports.run = async ({ client, message, args, prefix }) => {

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (player.queue.length < 1) return message.reply(`${client.uncheckEmoji} No songs in queue, use **${prefix}nowplaying** to check current playing song.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const trackList = []
    await player.queue.forEach(async (track) => {
        trackList.push({
            index: player.queue.indexOf(track),
            title: track.title,
            duration: await client.MSFormatter.small(track.duration),
            uri: track.uri,
            requester: track.requester.id
        })
    })

    const backId = 'back'
    const forwardId = 'forward'
    const backButton = new MessageButton({
        style: 'SECONDARY',
        emoji: '◀️',
        customId: backId
    })
    const forwardButton = new MessageButton({
        style: 'SECONDARY',
        emoji: '▶️',
        customId: forwardId
    })

    const serverName = client.guilds.cache.get(message.guildId).name

    const generateEmbed = async (start) => {
        const currentList = trackList.slice(start, start + 10)
        const trackValue = []
        currentList.forEach( (track) => {
            trackValue.push(`**[\`${track.index + 1}\`] │ ${track.duration} │ **[${track.title}](${track.uri} '${track.title}')** │ [<@${track.requester}>]**`)
        })

        const queueEmbed =  new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Showing ${start + 1} - ${start + currentList.length} songs out of ${trackList.length} in Queue`, iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription(`${trackValue.join('\n\n')}`)
            .setFooter({ text: `Music Queue for ${serverName}`, iconURL: `${message.author.displayAvatarURL()}` })

        return queueEmbed
    }

    const canFitOnOnePage = trackList.length <= 10

    const embedMessage = await message.reply({
        embeds: [await generateEmbed(0)],
        components: canFitOnOnePage ? [] : [new MessageActionRow({ components: [forwardButton] })]
    })

    if (canFitOnOnePage) return

    const collector = embedMessage.createMessageComponentCollector({
        filter: ({ user }) => user.id == message.author.id
    })

    let currentIndex = 0

    collector.on('collect', async interaction => {
        
        interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)

        await interaction.update({
            embeds: [await generateEmbed(currentIndex)],
            components: [
                new MessageActionRow({
                    components: [
                        ...(currentIndex ? [backButton] : []),
                        ...(currentIndex + 10 < trackList.length ? [forwardButton] : [])
                    ]
                })
            ]
        })
    })

}

module.exports.help = {
    name: 'queue',
    aliases: ['q'],
    description: 'Shows the queue of song in a server.',
    usage: 'queue'
}
