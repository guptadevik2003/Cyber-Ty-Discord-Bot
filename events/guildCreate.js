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


        // Sending message in System Channel
        const systemChannelId = guild.systemChannelId
        if (systemChannelId) {

            const systemChannel = client.channels.cache.get(systemChannelId)

            const systemEmbed = new MessageEmbed()
                .setColor(`#00ffff`)
                .setTitle(`:tada: Thanks for adding ${client.user.username}`)
                .setDescription(`**Heyy!** Thank you for inviting ${client.user.username},\n` +
                                `To start using CyberTy's Chatbot feature,\n` +
                                `make a channel and run **${botPrefix}setchannel**\n\n` +
                                `For a list of all commands use **${botPrefix}help**\n\n` +
                                `Need help? [Join the support server](${supportServerLink} 'Support Server').`)
                .setThumbnail(`https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif`)
                .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}` })

            systemChannel.send({ embeds: [systemEmbed] })

        }


        // Sending Join Leave Message in Cyber Ty - Support Server
        const notifyChannel = client.channels.cache.get(clientServerJoinLeaveNotifyChannel)
        
        const notifyEmbed = new MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`Joined ${guild.name.substring(0,25)}`)
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`MemberCount: **${guild.memberCount}**\n` +
                            `Id: **${guild.id}**\n` +
                            `OwnerId: **${guild.ownerId}**`)
            .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}` })

        notifyChannel.send({ embeds: [notifyEmbed] })

    }
}
