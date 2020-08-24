import dotenv from 'dotenv';
dotenv.config();
export default {
    api: {
    url : process.env.API_URL,
    travelndc_url:process.env.TRAVELNDC_API
    },
    client:{
        app_host: process.env.APP_HOST,
        port: process.env.PORT,
        securityGroup:process.env.SECURITY_GROUP


    },
    mode:{
        environment :process.env.NODE_ENV
    }
}