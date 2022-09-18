// const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { Client, Intents, Collection } = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new Client({
    partials: [
        'CHANNEL',
    ],
    // intents: [
    //     GatewayIntentBits.DirectMessageReactions,
    //     // GatewayIntentBits.DirectMessageTyping,
    //     GatewayIntentBits.DirectMessages,
    //     GatewayIntentBits.GuildBans,
    //     GatewayIntentBits.GuildEmojisAndStickers,
    //     // GatewayIntentBits.GuildIntegrations,
    //     GatewayIntentBits.GuildInvites,
    //     GatewayIntentBits.GuildMembers,
    //     GatewayIntentBits.GuildMessageReactions,
    //     // GatewayIntentBits.GuildMessageTyping,
    //     GatewayIntentBits.GuildMessages,
    //     GatewayIntentBits.GuildPresences,
    //     // GatewayIntentBits.GuildScheduledEvents,
    //     GatewayIntentBits.GuildVoiceStates,
    //     GatewayIntentBits.GuildWebhooks,
    //     GatewayIntentBits.Guilds,
    //     GatewayIntentBits.MessageContent,
    // ],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        // Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    ],
})

client.slashCommands = new Collection()
const functions = fs.readdirSync('./functions').filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const slashCommandFolders = fs.readdirSync('./slashCommands')

for (file of functions) {
    require(`./functions/${file}`)(client)
}

client.handleEvents(eventFiles, './events')
client.handleSlashCommands(slashCommandFolders, './slashCommands')
client.mongooseLogin()

client.login(process.env.DISCORD_BOT_TOKEN)
