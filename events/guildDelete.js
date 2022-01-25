const guildSchema = require('../schemas/guild')
const { MessageEmbed } = require('discord.js')
const { clientServerJoinLeaveNotifyChannel } = require('../config.json')

module.exports = {
    name: 'guildDelete',
    async execute(guild, client) {

        await guildSchema.findOneAndDelete({ guildId: guild.id })


        // Sending Join Leave Message in Cyber Ty - Support Server
        const notifyChannel = client.channels.cache.get(clientServerJoinLeaveNotifyChannel)

        const notifyEmbed = new MessageEmbed()
            .setColor(`RED`)
            .setTitle(`Left ${guild.name.substring(0,25)}`)
            .setDescription(`MemberCount: **${guild.memberCount}**\n` +
                            `Id: **${guild.id}**\n` +
                            `OwnerId: **${guild.ownerId}**`)
            .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}` })

        notifyChannel.send({embeds: [notifyEmbed] })

    }
}
