const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const circle = await Canvacord.circle(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [circle] })

}

module.exports.help = {
    name: 'circle',
    aliases: [],
    description: 'Sends a clicle photo of the mentioned user.',
    usage: 'circle'
}
