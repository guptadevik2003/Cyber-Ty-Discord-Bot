const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const wasted = await Canvacord.wasted(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [wasted] })

}

module.exports.help = {
    name: 'wasted',
    aliases: [],
    description: 'Sends a photo with user wasted.',
    usage: 'wasted [@CocoMelon / userID]'
}
