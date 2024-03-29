const { MessageEmbed } = require('discord.js')
const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const filterPlugin = require('erela.js-filters')
const { botClientId } = require('../config.json')

const clientID = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

const plugins = [
    new Spotify({
        clientID,
        clientSecret
    }),
    new filterPlugin()
]

const nodes = [
    {
        host: '127.0.0.1',
        password: 'devikwasboring2003',
        port: 2003,
        secure: false
    },
    {
        host: 'lavalink.teramont.net',
        password: 'eHKuFcz67k4lBS64',
        port: 25565,
        secure: false
    },
    {
        host: 'lavalink.micium-hosting.com',
        password: 'micium-hosting.com',
        port: 80,
        secure: false
    },
    {
        host: 'lavalink.jirayu.pw',
        password: 'youshallnotpass',
        port: 2343,
        secure: false
    }
]

module.exports = (client) => {

    const getChannel = async (player) => {
        return await client.channels.cache.get(player.textChannel)
    }

    client.handleErela = new Manager({
        autoPlay: true,
        clientId: botClientId,
        nodes: nodes,
        plugins: plugins,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id)
            if (guild) guild.shard.send(payload)
        }
    })


    client.handleErela.on('nodeConnect', async (node) => {
        console.log(`Connected to "${node.options.identifier}" Lavalink.`)
    })
    client.handleErela.on('nodeReconnect', async (node) => {
        console.log(`Reconnecting Node "${node.options.identifier}".`)
        console.log(`Reconnecting to "${node.options.identifier}" Lavalink.`)
    })
    client.handleErela.on('nodeDisconnect', async (node, reason) => {
        console.log(`Disconnected from "${node.options.identifier}" Lavalink.`)
        console.log(`Lavalink Disconnect Code: ${reason.code}`)
        console.log(`Lavalink Disconnect Error: ${reason.reason}`)
    })
    client.handleErela.on('nodeError', async (node, error) => {
        console.log(`Lavalink Error: Node "${node.options.identifier}"`)
        console.log(`Lavalink Error: ${error.message}`)
    })


    client.handleErela.on('queueEnd', async (player) => {
        const channel = await getChannel(player)
        const queueEndEmbed = new MessageEmbed()
            .setColor(`#00ffff`)
            .setDescription(`**Queue has ended**, Leaving <#${player.voiceChannel}>`)
        channel.send({ embeds: [queueEndEmbed] })

        try {
            player.destroy()
        } catch (err) {
            console.log(err)
        }
    })

    client.handleErela.on('trackStart', async (player, track) => {
        if (player.trackRepeat || player.queueRepeat) return
        
        const channel = await getChannel(player)
        channel.send(`:headphones: Playing **${track.title}** requested by **${track.requester.username}**`)
    })

}
