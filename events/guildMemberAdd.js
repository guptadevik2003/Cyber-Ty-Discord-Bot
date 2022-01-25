const { MessageEmbed } = require('discord.js')
const { cyberTySupportWelcomeChannel, supportServerGuildId } = require('../config.json')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {

        if (member.guild.id === supportServerGuildId) {

            const welcomeChannel = client.channels.cache.get(cyberTySupportWelcomeChannel)

            const memberAddEmbed = new MessageEmbed()
                .setColor(`GREEN`)
                .setTitle(`${member.user.tag} Joined`)
                .setDescription(`Hey everyone, Welcome <@${member.user.id}> to ${member.guild.name}.`)
                .setThumbnail(`${member.user.displayAvatarURL()}`)
                .setFooter({ text: `We now have ${member.guild.memberCount} members` })

            welcomeChannel.send({
                content: `<@${member.user.id}>`,
                embeds: [memberAddEmbed]
            })

        }

    }
}
