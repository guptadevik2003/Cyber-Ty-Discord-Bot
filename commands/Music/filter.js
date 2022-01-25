const { MessageEmbed } = require('discord.js')

module.exports.run = async ({ client, message, args, prefix }) => {

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply(`${client.uncheckEmoji} You need to be in a VC to run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const player = client.handleErela.players.get(message.guildId)
    if (!player) return message.reply(`${client.uncheckEmoji} I'm not connected to any VC.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })



    const filterEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor(`Filters`, `${client.user.displayAvatarURL()}`)
        .setDescription(`**You can use these filters.**\n` +
                        `**Usage:** \`${prefix}filter vaporwave\`\n\n` +
                        `\`\`\`yml\n` +
                        `NightCore | VaporWave | Soft\n` +
                        `\`\`\`\n\`\`\`yml\n` +
                        `Pop | BassBoost | TrebleBass\n` +
                        `\`\`\`\n\`\`\`yml\n` +
                        `Tremolo | Karaoke | Vibrato\n` +
                        `\`\`\`\n\`\`\`yml\n` +
                        `EightD | Reset\n` +
                        `\`\`\`\n\n`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL()}`)

    if (!args[0]) return message.reply({ embeds: [filterEmbed] })

    const fltr = args[0].toLowerCase()

    if (fltr === 'nightcore') {

        if (!player.nightcore) {
            player.nightcore = true
            return message.reply(`${client.checkEmoji} Activated **NightCore** Filter`)
        } else {
            player.nightcore = false
            return message.reply(`${client.checkEmoji} Deactivated **NightCore** Filter`)
        }

    }
    else if (fltr === 'vaporwave') {

        if (!player.vaporwave) {
            player.vaporwave = true
            return message.reply(`${client.checkEmoji} Activated **VaporWave** Filter`)
        } else {
            player.vaporwave = false
            return message.reply(`${client.checkEmoji} Deactivated **VaporWave** Filter`)
        }

    }
    else if (fltr === 'soft') {

        if (!player.soft) {
            player.soft = true
            return message.reply(`${client.checkEmoji} Activated **Soft** Filter`)
        } else {
            player.soft = false
            return message.reply(`${client.checkEmoji} Deactivated **Soft** Filter`)
        }

    }
    else if (fltr === 'pop') {

        if (!player.pop) {
            player.pop = true
            return message.reply(`${client.checkEmoji} Activated **Pop** Filter`)
        } else {
            player.pop = false
            return message.reply(`${client.checkEmoji} Deactivated **Pop** Filter`)
        }

    }
    else if (fltr === 'bassboost') {

        if (!player.bassboost) {
            player.bassboost = true
            return message.reply(`${client.checkEmoji} Activated **BassBoost** Filter`)
        } else {
            player.bassboost = false
            return message.reply(`${client.checkEmoji} Deactivated **BassBoost** Filter`)
        }

    }
    else if (fltr === 'treblebass') {

        if (!player.treblebass) {
            player.treblebass = true
            return message.reply(`${client.checkEmoji} Activated **TrebleBass** Filter`)
        } else {
            player.treblebass = false
            return message.reply(`${client.checkEmoji} Deactivated **TrebleBass** Filter`)
        }

    }
    else if (fltr === 'tremolo') {

        if (!player.tremolo) {
            player.tremolo = true
            return message.reply(`${client.checkEmoji} Activated **Tremolo** Filter`)
        } else {
            player.tremolo = false
            return message.reply(`${client.checkEmoji} Deactivated **Tremolo** Filter`)
        }

    }
    else if (fltr === 'karaoke') {

        if (!player.karaoke) {
            player.karaoke = true
            return message.reply(`${client.checkEmoji} Activated **Karaoke** Filter`)
        } else {
            player.karaoke = false
            return message.reply(`${client.checkEmoji} Deactivated **Karaoke** Filter`)
        }

    }
    else if (fltr === 'vibrato') {

        if (!player.vibrato) {
            player.vibrato = true
            return message.reply(`${client.checkEmoji} Activated **Vibrato** Filter`)
        } else {
            player.vibrato = false
            return message.reply(`${client.checkEmoji} Deactivated **Vibrato** Filter`)
        }

    }
    else if (fltr === 'eightd') {

        if (!player.eightD) {
            player.eightD = true
            return message.reply(`${client.checkEmoji} Activated **EightD** Filter`)
        } else {
            player.eightD = false
            return message.reply(`${client.checkEmoji} Deactivated **EightD** Filter`)
        }

    }
    else if (fltr === 'reset') {

        player.reset()
        return message.reply(`${client.checkEmoji} Resetted Filters`)

    }
    else {

        message.reply({ embeds: [filterEmbed] })

    }

}

module.exports.help = {
    name: 'filter',
    aliases: [],
    description: 'Enable or disable filter(s) of the queue.',
    usage: 'filter <filterName>'
}
