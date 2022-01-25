const { supportServerLink } = require('../../config.json')

module.exports.run = async ({ client, message, args, prefix }) => {

    message.reply(`Feel Free to Join our Support Server for any kind of support - ${supportServerLink}`)

}

module.exports.help = {
    name: 'support',
    aliases: [],
    description: 'Support Server of Cyber Ty.',
    usage: 'support'
}
