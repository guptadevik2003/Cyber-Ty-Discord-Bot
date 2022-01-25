const { botOwnerId } = require('../../config.json')
const { inspect } = require('util')

module.exports.run = async ({ client, message, args, prefix }) => {

    if (message.author.id !== botOwnerId) return message.reply(`${client.uncheckEmoji} Only the Owner of this bot can run this command.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    if (!args.length) return message.reply(`${client.uncheckEmoji} No Arguments Provided.`)
    .then(msg => { setTimeout(() => msg.delete(), 6969) })

    const code = args.join(' ')

    try {

        const result = await eval(code)
        let output = result

        if (typeof result !== 'string') {
            output = inspect(result)
        }

        message.reply(`\`\`\`javascript\n${output.substring(0, 1980)}\n\`\`\``)

    } catch (err) {

        console.log(err)
        message.reply(`${client.uncheckEmoji} An Error occured while evaluating.`)
        .then(msg => { setTimeout(() => msg.delete(), 6969) })
        
    }

}

module.exports.help = {
    name: 'eval',
    aliases: []
}
