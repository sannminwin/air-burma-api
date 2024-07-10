import * as dotenv from "dotenv";

dotenv.config();

module.exports = {
    app: {
        env : process.env.NODE_ENV,
        port: process.env.PORT,
        useHttps: process.env.USE_HTTPS,
        httpsPort: process.env.HTTPS_PORT
    },
    slack: {
        token: process.env.SLACK_TOKEN,
        channel: process.env.SLACK_CHANNEL,
    }
}