module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return

        const slashCommand = client.slashCommands.get(interaction.commandName)

        if (!slashCommand) return

        try {
            await slashCommand.execute(interaction, client)
        }
        catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'There was an error while executing this slashCommand!',
                ephemeral: true
            })
        }
    }
}
