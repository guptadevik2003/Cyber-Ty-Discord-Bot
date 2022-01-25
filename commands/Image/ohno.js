const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (!args[0]) return message.reply(`Enter the text you want to display.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    text = args.join(' ')

    const ohno = await Canvacord.ohno(text)

    message.reply({ files: [ohno] })

}

module.exports.help = {
    name: 'ohno',
    aliases: [],
    description: 'Sends photo of oh no, its stupid with your text.',
    usage: 'ohno <text>'
}
