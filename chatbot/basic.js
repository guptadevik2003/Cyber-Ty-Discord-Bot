const fetch = require('node-fetch')

module.exports.PGamerX = async (client, message) => {
    let result

    const apiBase = `https://random-stuff-api.p.rapidapi.com/ai`
    const query = `?msg=${message.content}` +
                  `&id=${message.author.id}` +
                  `&bot_name=${client.user.username}` +
                  `&bot_gender=male` +
                  `&bot_master=Devik_NotFound#2695` +
                  `&bot_age=18` +
                  `&bot_company=Maple Club` +
                  `&bot_birth_year=2003` +
                  `&bot_birth_date=11th December, 2003` +
                  `&bot_favorite_color=Blue` +
                  `&bot_favorite_book=Harry Potter` +
                  `&bot_favorite_band=One Direction` +
                  `&bot_favorite_artist=Olivia Rodrigo` +
                  `&bot_favorite_actress=Emma Mackey` +
                  `&bot_favorite_actor=Tom Holland`
    const apiURL = apiBase + query

    await fetch(apiURL, {
        method: 'GET',
        headers: {
            'Authorization': `${process.env.PGAMERX_APIKEY}`,
            'X-RapidAPI-Host': `random-stuff-api.p.rapidapi.com`,
            'X-RapidAPI-Key': `${process.env.RAPIDAPI_DEFAULTAPP_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {

        if (!data.AIResponse) {

            result = { error: 'no_response' }

        } else {

            result = { response: data.AIResponse }

        }

    })
    .catch(err => {

        result = { error: 'catched_error' }

    })

    return result
}

module.exports.MonkeDev = async (client, message) => {
    let result

    const apiBase = `https://api.monkedev.com/fun/chat`
    const query = `?msg=${message.content}` +
                  `&uid=${message.author.id}` +
                  `&key=${process.env.MONKEDEV_APIKEY}`
    const apiURL = apiBase + query

    await fetch(apiURL, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        
        if (!data.response) {

            result = { error: 'no_response' }

        } else {

            result = { response: data.response }

        }

    })
    .catch(err => {

        result = { error: 'catched_error' }

    })

    return result
}
