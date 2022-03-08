const { MessageEmbed } = require('discord.js')
const { supportServerLink, botPrefix, clientServerJoinLeaveNotifyChannel } = require('../config.json')
const guildSchema = require('../schemas/guild')

module.exports = {
    name: 'guildCreate',
    async execute(guild, client) {

        let guildData = await guildSchema.findOne({ guildId: guild.id })
        if (!guildData) {

            let newGuildData = await new guildSchema({
                guildName: guild.name,
                guildId: guild.id,
                botPrefix: botPrefix
            })
            await newGuildData.save().catch(err => console.log(err))

        } else {

            await guildSchema.findOneAndUpdate({ guildId: guild.id }, {
                guildName: guild.name,
                botPrefix: botPrefix
            })

        }


        // Sending Join Leave Message in Cyber Ty - Support Server
        const notifyChannel = client.channels.cache.get(clientServerJoinLeaveNotifyChannel)
        
        const notifyEmbed = new MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`Joined ${guild.name.substring(0,25)}`)
            .setDescription(`MemberCount: **${guild.memberCount}**\n` +
                            `Id: **${guild.id}**\n` +
                            `OwnerId: **${guild.ownerId}**`)
            .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}` })

        notifyChannel.send({ embeds: [notifyEmbed] })

    }
}
