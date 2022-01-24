// module.exports = {
//     async execute(client) {

//         

//         



//         // Bot Dashboard Database Interval
//         setInterval( async () => {

//             let botUserCount = 0
//             for (const g of client.guilds.cache) {
//                 botUserCount += g[1].memberCount
//             }
            
//             let dashboardData = await dashboardSchema.findOne({ botUserId: client.user.id })
//             if (!dashboardData) {

//                 let newDashboardData = await new dashboardSchema({
//                     _id: mongoose.Types.ObjectId(),
//                     botUserId: client.user.id,
//                     botUserName: client.user.username,
//                     botUserTag: client.user.tag,
//                     botAvatar: client.user.displayAvatarURL(),
//                     botUptime: client.uptime,
//                     botUptimeUpdatedAt: Date.now(),
//                     botWSPing: client.ws.ping,
//                     botGuildCount: client.guilds.cache.size,
//                     botUserCount: botUserCount
//                 })
//                 await newDashboardData.save().catch(err => console.log(err))

//             } else {

//                 await dashboardSchema.findOneAndUpdate({ botUserId: client.user.id }, {
//                     botUserName: client.user.username,
//                     botUserTag: client.user.tag,
//                     botAvatar: client.user.displayAvatarURL(),
//                     botUptime: client.uptime,
//                     botUptimeUpdatedAt: Date.now(),
//                     botWSPing: client.ws.ping,
//                     botGuildCount: client.guilds.cache.size,
//                     botUserCount: botUserCount
//                 })
//             } 
            
//         }, secToMs(60));

//     }
// }



// New Code
const { onReadyChannel, botPrefix, botWebsite, supportServerLink, botInviteLink, liveStatusChannel } = require('../config.json')
const dashboardSchema = require('../schemas/dashboard')
const { dependencies } = require('../package.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {


        // Console Logging
        console.log(`${client.user.tag} Online!`)
        console.log(`online`)


        // Getting Client Ready Time
        const Dnow = new Date()
        const UTCDnow = Dnow.getTime() + (Dnow.getTimezoneOffset() * 60 * 1000)
        const NewDnow = new Date(UTCDnow + (5.5 * 3600000)).toLocaleString()
        // Sending Embed to Ready Channel
        const clientReadyEmbed = new MessageEmbed()
            .setColor(`GREEN`)
            .setTitle(`${client.user.tag} Online!`)
            .setDescription(`\`\`\`yml\nTimestamp: ${NewDnow}\n\`\`\``)
        const clientReadyChannel = client.channels.cache.find(channel => channel.id === onReadyChannel)
        clientReadyChannel.send({ embeds: [clientReadyEmbed] })


        // Setting Presence
        client.user.setPresence({
            status: 'online',
            activities: [{
                name: `with Humans | ${botPrefix}help`
            }]
        })


        // Erela.js Init
        client.handleErela.init(client.user.id)


        // Function to convert sec to ms
        function secToMs(sec) {
            return sec * 1000
        }


        // Live Status Channel Support Server
        const liveChannel = client.channels.cache.get(liveStatusChannel)
        const editMessage = await liveChannel.messages.fetch('935227233839243355')
        const statusMessage = await liveChannel.messages.fetch('935227235558891664')
        const botOwner = `Devik_NotFound#2695`
        const cdSrt = `\`\`\`yml\n`
        const cdEnd = `\n\`\`\``
        const infoEmoji = client.infoEmoji
        setInterval( async () => {
            
            const editStart = Date.now()
            await editMessage.edit({ content: `${client.weeWooEmoji}` })
            const editEnd = Date.now()
            editMessage.edit({ content: `${client.loadingEmoji}` })
            const editPing = `${editEnd - editStart}ms`

            const discordJS = dependencies['discord.js'].replace('^', 'v')
            const erelaJS = dependencies['erela.js'].replace('^', 'v')
            const nodeJS = `v${process.versions.node}`
            const memUsage = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
            const clientUptime = await client.MSFormatter(client.uptime)
            const clientTag = client.user.tag
            const apiPing = `${client.ws.ping}ms`
            const servers = client.guilds.cache
            const channels = client.channels.cache.size
            var users = 0
            for (const s of servers) {
                users += s[1].memberCount
            }

            const statusEmbed = new MessageEmbed()
                .setColor(`#00ffff`)
                .setTitle(`${client.user.username} Live Stats`)
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter({ text: `Updates Every 69 Seconds`, iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(`${cdSrt}Name: ${clientTag} [${client.user.id}]\nApi Latency: ${apiPing}\nBot Latency: ${editPing}${cdEnd}`)
                .addField(`${infoEmoji} General Stats`, `${cdSrt}Servers: ${servers.size}\nUsers: ${users}\nChannels: ${channels}${cdEnd}`, true)
                .addField(`${infoEmoji} System Stats`, `${cdSrt}Node.js: ${nodeJS}\nDiscord.js: ${discordJS}\nErela.js: ${erelaJS}${cdEnd}`, true)
                .addField(`${infoEmoji} Other Stats`, `${cdSrt}Uptime: ${clientUptime}\nBot Owner: ${botOwner}\nMemory Usage: ${memUsage}${cdEnd}`, false)
                .addField(`${infoEmoji} Important Links`, `**[Invite Link](${botInviteLink} 'Invite Link')・[Support Server](${supportServerLink} 'Support Server')・[Website](${botWebsite} 'CyberTy | Your Discord Buddy')**`, false)

            statusMessage.edit({ embeds: [statusEmbed] })

        }, secToMs(9));

    }
}
