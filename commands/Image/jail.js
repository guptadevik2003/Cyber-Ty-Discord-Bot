const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const jail = await Canvacord.jail(user.avatarURL({ format: 'png', size: 4096 }), true)

    message.reply({ files: [jail] })

}

module.exports.help = {
    name: 'jail',
    aliases: [],
    description: 'Sends a photo that shows the user in jail.',
    usage: 'jail [@CocoMelon / userID]'
}
