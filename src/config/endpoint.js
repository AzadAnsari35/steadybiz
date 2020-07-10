import config from './index';
export default {
    api:
    {
        api_url:config.API.url
    },
    flights : {
        flightRevalidate :{url:'/flights/flightRevalidate', isAuth:true},
        flightSelect :{url : '/flights/flightSelect',isAuth:true}
    }
}