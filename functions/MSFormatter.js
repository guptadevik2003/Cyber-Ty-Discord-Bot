const ms = require('parse-ms')

module.exports = (client) => {
    client.MSFormatter = async (MSTimeArg) => {

        const time = ms(MSTimeArg)
        const seconds = `${time.seconds} ${time.seconds <= 1 ? 'Sec' : 'Secs'}`
        const minutes = `${time.minutes} ${time.minutes <= 1 ? 'Min' : 'Mins'}`
        const hours = `${time.hours} ${time.hours <= 1 ? 'Hour' : 'Hrs'}`
        const days = `${time.days} ${time.days <= 1 ? 'Day' : 'Days'}`
        let formattedTime
        if (MSTimeArg < 1000 * 60) {
            formattedTime = `${seconds}`
        }
        if (MSTimeArg < 1000 * 60 * 60 && MSTimeArg >= 1000 * 60) {
            formattedTime = `${minutes}︲${seconds}`
        }
        if (MSTimeArg < 1000 * 60 * 60 * 24 && MSTimeArg >= 1000 * 60 * 60) {
            formattedTime = `${hours}︲${minutes}︲${seconds}`
        }
        if (MSTimeArg >= 1000 * 60 * 60 * 24) {
            formattedTime = `${days}︲${hours}︲${minutes}︲${seconds}`
        }
        return formattedTime

    }

    client.MSFormatter.small = async (MSTimeArg) => {

        const time = ms(MSTimeArg)
        const seconds = `${time.seconds <= 9 ? `0${time.seconds}` : `${time.seconds}`}`
        const minutes = `${time.minutes <= 9 ? `0${time.minutes}` : `${time.minutes}`}`
        const hours = `${time.hours <= 9 ? `0${time.hours}` : `${time.hours}`}`
        const days = `${time.days}`
        let formattedTime
        if (MSTimeArg < 1000 * 60 * 60) {
            formattedTime = `${minutes}:${seconds}`
        }
        if (MSTimeArg < 1000 * 60 * 60 * 24 && MSTimeArg >= 1000 * 60 * 60) {
            formattedTime = `${hours}:${minutes}:${seconds}`
        }
        if (MSTimeArg >= 1000 * 60 * 60 * 24) {
            formattedTime = `${days}:${hours}:${minutes}:${seconds}`
        }
        return formattedTime

    }
}
