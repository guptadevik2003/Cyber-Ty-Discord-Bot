const math = require('mathjs')
const { MessageEmbed } = require('discord.js')
const CountingSchema = require('../schemas/counting')

module.exports = async ({ client, message, countingChannel }) => {

    // Getting currentCount from Database
    let currentCount = countingChannel.currentCount

    // Creating userCount by evaluating message
    let userCount
    try {
        userCount = math.evaluate(message.content)
    } catch (err) {  }

    const guildName = client.guilds.cache.get(message.guildId).name

    // If counting not a number eg: any other message... return
    if (isNaN(userCount)) return;

    // IF Counting is Correct
    if (userCount === currentCount + 1) {

        await CountingSchema.findOneAndUpdate({ channelId: message.channelId }, {
            guildName: guildName,
            currentCount: currentCount + 1
        })

        message.react(`${client.checkEmoji}`)

    }

    else {

        const countResetEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setDescription(`<@${message.author.id}> Ruined the Count at **${currentCount}**! Next number is **1**.`)

        message.channel.send({ embeds: [countResetEmbed] })

        // Resetting the count
        await CountingSchema.findOneAndUpdate({ channelId: message.channelId }, {
            guildName: guildName,
            currentCount: 0
        })

    }

}
