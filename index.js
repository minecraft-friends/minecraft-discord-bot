const aws = require('./aws/aws')
const Bot = require('./bot')

// aws.getUser() //debug if needed
aws.getConfig().then(() => {
    const bot = new Bot();
    bot.login()
})
