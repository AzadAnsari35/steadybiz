import axios from 'axios';
import {HttpVerbsConstant} from 'Constants/commonConstant';
export const httpRequest = async (reqType, data, header, apiUrl) => {
  // eslint-disable-next-line no-useless-catch
  try {
    switch (reqType) {
      case HttpVerbsConstant.POST: {
        var response = await axios.post(apiUrl, data, { headers: header });
        return response.data;
      }
      case HttpVerbsConstant.PUT: {
        const response = await axios.put(apiUrl, header);
        return response;
      }
      case HttpVerbsConstant.DELETE: {
        const response = await axios.delete(apiUrl, header);
        return response;
      }
      case HttpVerbsConstant.GET: {
        
        const response = await axios.get(apiUrl, { headers: header });
        return response.data;
      }
      default:
        throw new Error('wrong verb passed');
    }
  } catch (aerror) {
    if (aerror.response) {
      if(aerror.response.data)
      {
        throw new Error(JSON.stringify(aerror.response.data));
      }
      else
      throw aerror;
    }
    throw aerror;
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response);
    //     // console.log(error.response.status);
    //     // console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //  // console.log(error.config);
    //   throw new Error(error.Error);
  }
};
