const mongoose = require('mongoose')

module.exports = (client) => {
    client.mongooseLogin = async () => {

        mongoose.set('strictQuery', false)
        mongoose.Promise = global.Promise

        mongoose.connect(process.env.CYBERTY_MONGODB)

        mongoose.connection.on('connected', async () => {
            console.log(`Connected to Project Cyber Ty Bot Database.`)
        })

        mongoose.connection.on('disconnected', async () => {
            console.log(`Disconnected from Project Cyber Ty Bot Database.`)
        })

        mongoose.connection.on('err', async (error) => {
            console.log(error)
        })

    }
}
