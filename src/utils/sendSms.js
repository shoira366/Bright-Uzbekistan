import Vonage from "@vonage/server-sdk"

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
})

const sender = "Verification"
const opts = {
    debug: true || false,
    appendToUserAgent: "string",
    logger: {
        log: function() {},
        info: function() {},
        warn: function() {}
    },
    timeout: 12,
    apiHost: "string",
    restHost: "string"
}

const callback = (error, response) => {
    if (error) {
      console.error(error)
    }
   
    if (response) {
      console.log(response)
    }
}

const sendSms = (recipient, message) =>{
    vonage.message.sendSms(sender, recipient, message, callback)
}

export default sendSms