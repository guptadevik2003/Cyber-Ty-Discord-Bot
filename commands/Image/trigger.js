const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const trigger = await Canvacord.trigger(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [trigger] })

}

module.exports.help = {
    name: 'trigger',
    aliases: ['triggered'],
    description: 'Sends a photo with user triggered.',
    usage: 'trigger'
}
