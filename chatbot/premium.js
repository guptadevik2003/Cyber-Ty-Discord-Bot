const fetch = require('node-fetch')

module.exports.DevikGupta = async (client, message) => {
    let result

    const apiBase = `https://www.personalityforge.com/api/chat/`
    const query = `?apiKey=${process.env.PERSONALITY_FORGE_DEVIKGUPTA}` +
                  `&message=${message.content}` +
                  `&chatBotID=63906` +
                  `&externalID=${message.author.id}`
    const apiURL = apiBase + query

    await fetch(apiURL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {

        if (data.success == 1) {

            result = { response: data.message.message }

        }
        if (data.success == 0) {

            result = { error: 'data_success_0' }

        }

    })
    .catch(err => {

        result = { error: 'catched_error' }

    })

    return result
}

module.exports.DevikGuptaAd = async (client, message) => {
    let result

    const apiBase = `https://www.personalityforge.com/api/chat/`
    const query = `?apiKey=${process.env.PERSONALITY_FORGE_DEVIKGUPTAAD}` +
                  `&message=${message.content}` +
                  `&chatBotID=63906` +
                  `&externalID=${message.author.id}`
    const apiURL = apiBase + query

    await fetch(apiURL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {

        if (data.success == 1) {

            result = { response: data.message.message }

        }
        if (data.success == 0) {

            result = { error: 'data_success_0' }
            
        }

    })
    .catch(err => {

        result = { error: 'catched_error' }

    })

    return result
}
