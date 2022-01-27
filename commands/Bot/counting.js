const CountingSchema = require('../../schemas/counting')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const perm = message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) || message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
    if (!perm) return message.reply(`${client.uncheckEmoji} You need **Manage Channels** or **Manage Server** Permission to use this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    let countingData = await CountingSchema.findOne({ guildId: message.guildId })

    if (args[0] === 'add') {

        if (!args[1]) return message.reply(`${client.uncheckEmoji} **Mention a Channel** or **Enter Channel ID**.\n${prefix}counting add <#${message.channelId}>`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

        const providedChannelId = args[1].replace('<', '').replace('#', '').replace('>', '')

        const prvdChannel = client.channels.cache.get(providedChannelId)
        if (!prvdChannel) return message.reply(`${client.uncheckEmoji} Please provide a Valid **Text Channel**.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

        if (prvdChannel.type !== 'GUILD_TEXT') return message.reply(`${client.uncheckEmoji} Please provide a Valid **Text Channel**.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

        const guildName = client.guilds.cache.get(message.guildId).name

        if (countingData) {

            countingData = await CountingSchema.findOneAndUpdate({ guildId: message.guildId }, {
                guildName: guildName,
                channelId: prvdChannel.id,
                setById: message.author.id
            })

            const updateEmbed = new MessageEmbed()
                .setColor(`#00ffff`)
                .setAuthor({ name: `Channel Updated`, iconURL: `${client.user.displayAvatarURL()}` })
                .setThumbnail(`https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif`)
                .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                .addField(`Counting Channel Updated!`, `• Old Channel: **<#${countingData.channelId}>**\n• New Channel: **<#${prvdChannel.id}>**\n• Current Count: **${countingData.currentCount}**\n• Set By: **<@${message.author.id}>**`, false)

            message.reply({ embeds: [updateEmbed] })

        } else {

            countingData = await new CountingSchema({
                guildName: guildName,
                guildId: message.guildId,
                channelId: prvdChannel.id,
                setById: message.author.id
            })
            await countingData.save().catch(err => console.log(err))

            const createEmbed = new MessageEmbed()
                .setColor(`#00ffff`)
                .setAuthor({ name: `Channel Added`, iconURL: `${client.user.displayAvatarURL()}` })
                .setThumbnail(`https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif`)
                .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                .addField(`Counting Channel Added!`, `• Channel: **<#${countingData.channelId}>**\n• Server: **${countingData.guildName}**\n• Set By: **<@${countingData.setById}>**`, false)

            message.reply({ embeds: [createEmbed] })

        }

    }
    else if (args[0] === 'delete' || args[0] === 'del') {

        if (!countingData) return message.reply(`${client.uncheckEmoji} **No Record Found** Use \`${prefix}counting add\` to add a Record.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

        await CountingSchema.findOneAndDelete({ guildId: message.guildId })

        const deleteEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Channel Deleted`, iconURL: `${client.user.displayAvatarURL()}` })
            .setThumbnail(`https://media.giphy.com/media/26xBIUj4Y6K2LcIz6/giphy.gif`)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .addField(`Counting Channel Deleted!`, `• Deleted Channel: **<#${countingData.channelId}>**\n\nTo reconfigure Counting,\nUse **\`${prefix}counting add\`**`, false)

        message.reply({ embeds: [deleteEmbed] })

    }
    else {

        const countHelpEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `Counting Help`, iconURL: `${client.user.displayAvatarURL()}` })
            .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .addField(`Adding / Updating Counting`, `• Use \`${prefix}counting add #channel\`\n•  or \`${prefix}counting add Channel_ID\`\n\n• The **${prefix}counting add** command will both add and update counting channel,\n• On updating channel, Current counting will **NOT** be resetted.`, false)
            .addField(`Deleting / Resetting Counting`, `• Deleting Channel from database / Resetting Count,\n\n• Use \`${prefix}counting delete\` to Delete the channel from database\n• Or to Reset the current Count,\n• After using **${prefix}counting delete** command you will have to reconfigure your counting channel by using ${prefix}counting add`, false)

        message.reply({ embeds: [countHelpEmbed] })

    }

}

module.exports.help = {
    name: 'counting',
    aliases: [],
    description: 'Add / Delete channel for Counting.',
    usage: 'counting <add / delete>'
}
