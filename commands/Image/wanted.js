const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const wanted = await Canvacord.wanted(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [wanted] })

}

module.exports.help = {
    name: 'wanted',
    aliases: [],
    description: 'Sends a photo with mentioned user wanted.',
    usage: 'wanted'
}
