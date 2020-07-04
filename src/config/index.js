import dotenv from 'dotenv';
dotenv.config();
export default {
    API: {
    url : process.env.API_URL
    },
    CLIENT:{
        app_host: process.env.APP_HOST,
        port: process.env.PORTa
    },
    MODE:{
        environment :process.env.REACT_ENV
    }
}