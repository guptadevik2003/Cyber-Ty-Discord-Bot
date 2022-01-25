const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const blur = await Canvacord.blur(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [blur] })

}

module.exports.help = {
    name: 'blur',
    aliases: [],
    description: 'Sends a blur photo of the user.',
    usage: 'blur'
}
