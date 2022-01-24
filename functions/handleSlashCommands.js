const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')
const { botClientId, testServerGuildId } = require('../config.json')

const buildMode = process.env.BUILD_MODE
const clientId = botClientId
const guildId = testServerGuildId

module.exports = (client) => {
    client.handleSlashCommands = async (slashCommandFolders, path) => {
        
        client.slashCommandArray = []

        for (folder of slashCommandFolders) {
            
            const slashCommandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'))
            
            for (const file of slashCommandFiles) {
                
                const slashCommand = require(`../slashCommands/${folder}/${file}`)
                client.slashCommands.set(slashCommand.data.name, slashCommand)
                client.slashCommandArray.push(slashCommand.data.toJSON())
            
            }
        
        }

        const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

        (async () => {

            if (buildMode === 'development') {
                
                try {

                    console.log(`\n[${buildMode.toUpperCase()}] Refreshing Guild Slash Commands.\n`)
    
                    await rest.put(
                        Routes.applicationGuildCommands(clientId, guildId),
                        { body: client.slashCommandArray },
                    )
    
                    console.log(`\n[${buildMode.toUpperCase()}] Success! Reloaded Guild Slash Commands.\n`)

                } catch (error) {

                    console.error(error)

                }

            }
            if (buildMode === 'production') {
                
                try {

                    console.log(`\n[${buildMode.toUpperCase()}] Refreshing Global Slash Commands.\n`)
    
                    await rest.put(
                        Routes.applicationCommands(clientId),
                        { body: client.slashCommandArray },
                    )
    
                    console.log(`\n[${buildMode.toUpperCase()}] Success! Reloaded Global Slash Commands.\n`)

                } catch (error) {

                    console.error(error)
                    
                }

            }

        })();

    }
}
