const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (!args[0]) return message.reply(`Enter the text you want to display.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    text = args.join(' ')

    const clyde = await Canvacord.clyde(text)

    message.reply({ files: [clyde] })

}

module.exports.help = {
    name: 'clyde',
    aliases: [],
    description: 'Sends a photo that has clyde sending that text.',
    usage: 'clyde <text>'
}
