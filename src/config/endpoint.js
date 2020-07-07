import config from './index';
export default {
    flights : {
        flightRevalidate :config.API.url+'/flights/flightRevalidate',
        flightSelect :config.API.url+'/flights/flightSelect'
    }
}