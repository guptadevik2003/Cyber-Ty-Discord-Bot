const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    const user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0]) || message.author

    const rip = await Canvacord.rip(user.avatarURL({ format: 'png', size: 4096 }))

    message.reply({ files: [rip] })

}

module.exports.help = {
    name: 'rip',
    aliases: [],
    description: '"F" in the chat please.',
    usage: 'rip'
}
