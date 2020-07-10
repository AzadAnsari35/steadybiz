import dotenv from 'dotenv';
dotenv.config();
export default {
    api: {
    url : process.env.API_URL
    },
    client:{
        app_host: process.env.APP_HOST,
        port: process.env.PORT
    },
    mode:{
        environment :process.env.NODE_ENV
    }
}