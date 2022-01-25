const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const beautiful = await Canvacord.beautiful(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [beautiful] })

}

module.exports.help = {
    name: 'beautiful',
    aliases: [],
    description: 'Sends a photo that says Oh this, This is beautiful.',
    usage: 'beautiful'
}
