const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const trash = await Canvacord.trash(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [trash] })

}

module.exports.help = {
    name: 'trash',
    aliases: [],
    description: 'Sends a photo trashing mentioned user.',
    usage: 'trash [@CocoMelon / userID]'
}
