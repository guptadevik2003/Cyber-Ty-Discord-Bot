const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const greyscale = await Canvacord.greyscale(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [greyscale] })

}

module.exports.help = {
    name: 'greyscale',
    aliases: [],
    description: 'Sends a greyscale photo of the user.',
    usage: 'greyscale'
}
