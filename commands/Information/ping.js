const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const time1Start = Date.now()
    let timeMsg = await message.reply(`**Pinging... :rocket:**`)
    const time1End = Date.now()
    const time1Ping = time1End - time1Start

    setTimeout(() => {}, 200)

    const time2Start = Date.now()
    await timeMsg.edit(`**Pinging... :one:**`)
    const time2End = Date.now()
    const time2Ping = time2End - time2Start

    setTimeout(() => {}, 200)

    const time3Start = Date.now()
    await timeMsg.edit(`**Pinging... :two:**`)
    const time3End = Date.now()
    const time3Ping = time3End - time3Start

    setTimeout(() => {}, 200)

    await timeMsg.edit(`**Pinging... :three:**`)

    setTimeout(() => {}, 200)

    const apiPing = client.ws.ping
    const averageSpeed = ((time1Ping + time2Ping + time3Ping) / 3).toFixed()

    const pingEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Latency`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`Pinged 3 times and Calculated average.`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        .addField(`Ping 1:`, `${time1Ping}ms`, true)
        .addField(`Ping 2:`, `${time2Ping}ms`, true)
        .addField(`Ping 3:`, `${time3Ping}ms`, true)
        .addField(`API Latency:`, `${apiPing}ms`, true)
        .addField(`Average Speed:`, `${averageSpeed}ms`, true)

    timeMsg.edit({ content: `** **`, embeds: [pingEmbed] })

}

module.exports.help = {
    name: 'ping',
    aliases: ['latency'],
    description: 'Runs a connection test to Discord.',
    usage: 'ping'
}
