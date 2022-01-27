const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const rainbow = await Canvacord.rainbow(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [rainbow] })

}

module.exports.help = {
    name: 'rainbow',
    aliases: [],
    description: 'Sends a photo that shows the mentioned user avatar raindowed.',
    usage: 'rainbow [@CocoMelon / userID]'
}
