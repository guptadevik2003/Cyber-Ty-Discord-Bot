const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    message.delete()
    .catch(err => console.log(err))

    const nitroSendEmbed = new MessageEmbed()
        .setColor(`#2f3136`)
        .setTitle(`You've been gifted a subscription!`)
        .setDescription(`You've been gifted Nitro for 1 month!`)
        .setThumbnail(`https://cyberty.mapleclub.top/assets/discordNitroLogo.png`)

    const nitroExpireEmbed = new MessageEmbed()
        .setColor(`#2f3136`)
        .setTitle(`You've been gifted a subscription!`)
        .setDescription(`Hmm, it seems someone already claimed this gift.`)
        .setThumbnail(`https://cyberty.mapleclub.top/assets/discordNitroLogo.png`)

    const nitroSendRow = new MessageActionRow({
        components: [
            new MessageButton({
                customId: 'accept',
                disabled: false,
                label: '⠀ACCEPT⠀',
                style: 'SUCCESS',
                type: 'BUTTON',
            })
        ]
    })

    const nitroExpireRow = new MessageActionRow({
        components: [
            new MessageButton({
                customId: 'expired',
                disabled: true,
                label: '⠀ACCEPT⠀',
                style: 'SECONDARY',
                type: 'BUTTON',
            })
        ]
    })

    const messageSent = await message.channel.send({
        embeds: [nitroSendEmbed],
        components: [nitroSendRow]
    })

    const collector = messageSent.createMessageComponentCollector({
        filter: ({ user }) => user.id == message.author.id
    })

    collector.on('collect', async interaction => {

        interaction.customId === 'accept'

        await interaction.update({
            embeds: [nitroExpireEmbed],
            components: [nitroExpireRow],
        })

        interaction.followUp({
            content: 'https://c.tenor.com/yheo1GGu3FwAAAAC/rick-roll-rick-ashley.gif',
            ephemeral: true
        })

    })
}

module.exports.help = {
    name: 'nitro',
    aliases: [],
    description: 'Generates a free nitro link ;-)',
    usage: 'nitro'
}
