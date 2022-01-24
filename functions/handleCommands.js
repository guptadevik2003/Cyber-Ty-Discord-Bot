const fs = require('fs')
const { Collection } = require('discord.js')

module.exports = (client) => {

    client.commands = new Collection()
    client.aliases = new Collection()
    
    fs.readdirSync('./commands/').forEach(dir => {
        fs.readdir(`./commands/${dir}`, (err, files) => {

            if (err) throw err
    
            var jsFiles = files.filter(f => f.split('.').pop() === 'js')
            if (jsFiles.length <= 0) return console.log(`[COMMAND] Can't find any Commands`)

            console.log(`[COMMAND] Loaded ${files.length < 10 ? `0${files.length}` : `${files.length}`} Commands from "${dir.toUpperCase()}"`)
    
            jsFiles.forEach(file => {
                
                var fileGet = require(`../commands/${dir}/${file}`)
    
                try {

                    client.commands.set(fileGet.help.name, fileGet)
    
                    fileGet.help.aliases.forEach(alias => {
                        client.aliases.set(alias, fileGet.help.name)
                    })

                } catch (err) {

                    return console.log(err)

                }

            })

        })
    })

}
