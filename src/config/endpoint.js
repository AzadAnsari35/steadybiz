import config from './index.js';
export default {
    flights : {
        flightRevalidate :config.API.url+'/flights/flightRevalidate',
        flightSelect :config.API.url+'/flights/flightSelect'
    }
}