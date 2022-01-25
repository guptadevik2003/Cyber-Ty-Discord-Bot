const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Runs a connection test to Discord.'),

    async execute(interaction, client) {
        await interaction.reply(`**Pong! :ping_pong:** ${client.ws.ping}ms`)
    }
}
