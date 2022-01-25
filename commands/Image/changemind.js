const { Canvacord } = require('canvacord')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (!args[0]) return message.reply(`Enter the text you want to display.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    text = args.join(' ')

    const changemymind = await Canvacord.changemymind(text)

    message.reply({ files: [changemymind] })

}

module.exports.help = {
    name: 'changemind',
    aliases: ['changem'],
    description: 'Sends photo of change my mind with your text.',
    usage: 'changemind <text>'
}
