const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { botOwnerId, supportServerLink } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    const arwP = `<:arrowP:919363983511810108>`
    const arwG =`<:arrowG:919363931896700968>`
    const pre = prefix

    
    // ========== Per command Help ==========
    if (args[0]) {

        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
        if (!command) return message.reply(`There's no command named **${args[0]}**`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })

        const usageEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setAuthor({ name: `${command.help.name} Command`, iconURL: `${client.user.displayAvatarURL()}` })
            .setDescription(`**Name:**\n\`${command.help.name}\`\n\n` +
                            `**Alias:**\n\`${command.help.aliases.join(' | ') || 'No Aliases'}\`\n\n` +
                            `**Usage:**\n\`${pre}${command.help.usage}\`\n\n` +
                            `**Description:**\n${command.help.description}`)
            .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

        return message.reply({ embeds: [usageEmbed] })
    }

    // ========== General Help ==========

    const firstEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Help Interface`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`**Select a Category below to see it's Commands**\n\n` +
                        `${arwG} ${client.user.username} is currently under early release,\n` +
                        `So there might be some bugs and random crashes.\n\n` +
                        `Contact <@${botOwnerId}> or join\n` +
                        `**[Support Server](${supportServerLink} 'Support Server')** if you face any issue.`)
        .setImage(`https://share.creavite.co/ASmcZYvQmepVNfhC.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })


    const configEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Config Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}counting** - Add / Delete channel for Counting.\n` +
                        `${arwP} **${pre}deletechannel** - Disable Cyber Ty Chatbot IF added.\n` +
                        `${arwG} **${pre}setchannel** - Sets a channel where users can use Chatbot.\n` +
                        `${arwP} **${pre}setprefix** - Sets a custom prefix for each server.`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })


    const funEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Fun Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}nitro** - Generates a free nitro link ;-)`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })

    
    const imageEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Image Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}beautiful** - Sends a photo that says Oh this, This is beautiful.\n` +
                        `${arwP} **${pre}blur** - Sends a blur photo of the user.\n` +
                        `${arwG} **${pre}changemind** - Sends photo of change my mind with your text.\n` +
                        `${arwP} **${pre}circle** - Sends a clicle photo of the mentioned user.\n` +
                        `${arwG} **${pre}clyde** - Sends a photo that has clyde sending that text.\n` +
                        `${arwP} **${pre}greyscale** - Sends a greyscale photo of the user.\n` +
                        `${arwG} **${pre}jail** - Sends a photo that shows the user in jail.\n` +
                        `${arwP} **${pre}ohno** - Sends photo of oh no, its stupid with your text.\n` +
                        `${arwG} **${pre}rainbow** - Sends a photo that shows the mentioned user avatar raindowed.\n` +
                        `${arwP} **${pre}rip** - "F" in the chat please.\n` +
                        `${arwG} **${pre}slap** - Sends a photo with sender slapping mentioned user.\n` +
                        `${arwP} **${pre}trash** - Sends a photo trashing mentioned user.\n` +
                        `${arwG} **${pre}trigger** - Sends a photo with user triggered.\n` +
                        `${arwP} **${pre}wanted** - Sends a photo with mentioned user wanted.\n` +
                        `${arwG} **${pre}wasted** - Sends a photo with user wasted.\n`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })


    const informationEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Information Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}avatar** - Displays the avatar of the user.\n` +
                        `${arwP} **${pre}help** - Shows list of all commands & other information.\n` +
                        `${arwG} **${pre}invite** - Invite link to add ${client.user.username} to your server.\n` +
                        `${arwP} **${pre}ping** - Runs a connection test to Discord.\n` +
                        `${arwG} **${pre}serverinfo** - Shows some info about your server.\n` +
                        `${arwP} **${pre}stats** - Returns some details about the bot.\n` +
                        `${arwG} **${pre}support** - Support Server of Cyber Ty.\n` +
                        `${arwP} **${pre}vote** - Like ${client.user.username}? Vote now :)`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })


    const moderationEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Moderation Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}ban** - Bans a member from your server.\n` +
                        `${arwP} **${pre}clear** - Clears the amount of messages from a channel.`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
        

    const musicEmbed = new MessageEmbed()
        .setColor(`#00ffff`)
        .setAuthor({ name: `Music Commands`, iconURL: `${client.user.displayAvatarURL()}` })
        .setDescription(`${arwG} **${pre}filter** - Enable or disable filter(s) of the queue.\n` +
                        `${arwP} **${pre}nowplaying** - Shows the song currently playing.\n` +
                        `${arwG} **${pre}pause** - Pauses the currently playing music.\n` +
                        `${arwP} **${pre}play** - Play or add songs using song name / URL.\n` +
                        `${arwG} **${pre}queue** - Shows the queue of song in a server.\n` +
                        `${arwP} **${pre}repeat** - Repeats a song / queue infinitely.\n` +
                        `${arwG} **${pre}resume** - Resumes the paused music in a VC.\n` +
                        `${arwP} **${pre}shuffle** - Shuffles the songs of a queue randomly.\n` +
                        `${arwG} **${pre}skip** - Skips to the next song in the queue.\n` +
                        `${arwP} **${pre}stop** - Stops the song playing and leaves VC.\n` +
                        `${arwG} **${pre}volume** - Sets the volume of the song (0-200).`)
        .setThumbnail(`https://media.giphy.com/media/EPdbysBHd51Li/giphy.gif`)
        .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })



    const helpRow = new MessageActionRow({
        components: [new MessageSelectMenu({
            customId: 'help-command',
            placeholder: 'Select a Category to see it\'s Commands',
            type: 'SELECT_MENU',
            options: [
                {
                    label: 'Config Commands',
                    value: 'config',
                    description: `${client.user.username}'s Config Commands`,
                    emoji: '⚙️'
                },
                {
                    label: 'Fun Commands',
                    value: 'fun',
                    description: `${client.user.username}'s Fun Commands`,
                    emoji: '⚽'
                },
                {
                    label: 'Image Commands',
                    value: 'image',
                    description: `${client.user.username}'s Image Commands`,
                    emoji: '🖼️'
                },
                {
                    label: 'Information Commands',
                    value: 'information',
                    description: `${client.user.username}'s Information Commands`,
                    emoji: '📝'
                },
                {
                    label: 'Moderation Commands',
                    value: 'moderation',
                    description: `${client.user.username}'s Moderation Commands`,
                    emoji: '🔨'
                },
                {
                    label: 'Music Commands',
                    value: 'music',
                    description: `${client.user.username}'s Music Commands`,
                    emoji: '🎶'
                }
            ]
        })]
    })

    const messageReply = await message.reply({
        embeds: [firstEmbed],
        components: [helpRow]
    })

    const collector = messageReply.createMessageComponentCollector({
        filter: ({ user }) => user.id == message.author.id
    })

    collector.on('collect', async (interaction) => {

        if (interaction.customId === 'help-command') {
            const value = interaction.values[0]
            if (value === 'config') {
                await interaction.update({
                    embeds: [configEmbed],
                    components: [helpRow]
                })
            }
            if (value === 'fun') {
                await interaction.update({
                    embeds: [funEmbed],
                    components: [helpRow]
                })
            }
            if (value === 'image') {
                await interaction.update({
                    embeds: [imageEmbed],
                    components: [helpRow]
                })
            }
            if (value === 'information') {
                await interaction.update({
                    embeds: [informationEmbed],
                    components: [helpRow]
                })
            }
            if (value === 'moderation') {
                await interaction.update({
                    embeds: [moderationEmbed],
                    components: [helpRow]
                })
            }
            if (value === 'music') {
                await interaction.update({
                    embeds: [musicEmbed],
                    components: [helpRow]
                })
            }
        }

    })

}

module.exports.help = {
    name: 'help',
    aliases: [],
    description: 'Shows list of all commands & other information.',
    usage: 'help <commandName>'
}
