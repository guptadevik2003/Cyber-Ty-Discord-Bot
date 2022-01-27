const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const slapper = message.author

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const slap = await Canvacord.slap(
        slapper.avatarURL({ format: 'png', size: 4096 }),
        user.avatarURL({ format: 'png', size: 4096 })
        )

    message.reply({ files: [slap] })

}

module.exports.help = {
    name: 'slap',
    aliases: [],
    description: 'Sends a photo with sender slapping mentioned user.',
    usage: 'slap [@CocoMelon / userID]'
}
