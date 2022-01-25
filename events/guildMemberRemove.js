const { MessageEmbed } = require('discord.js')
const { cyberTySupportWelcomeChannel, supportServerGuildId } = require('../config.json')

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {

        if (member.guild.id === supportServerGuildId) {

            const welcomeChannel = client.channels.cache.get(cyberTySupportWelcomeChannel)

            const memberLeaveEmbed = new MessageEmbed()
                .setColor(`RED`)
                .setTitle(`${member.user.tag} Left`)
                .setDescription(`It seems <@${member.user.id}> left us :(`)
                .setThumbnail(`${member.user.displayAvatarURL()}`)
                .setFooter({ text: `We now have ${member.guild.memberCount} members` })

            welcomeChannel.send({
                embeds: [memberLeaveEmbed]
            })

        }

    }
}
