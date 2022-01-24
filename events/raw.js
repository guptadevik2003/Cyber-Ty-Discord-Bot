module.exports = {
    name: 'raw',
    async execute(raw, zero, client) {

        client.handleErela.updateVoiceState(raw)

    }
}
