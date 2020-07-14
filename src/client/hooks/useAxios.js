import React, {useEffect,useState} from 'react';
import {apiReqeust,utils,Response} from 'Helpers/';

const useAxios=(_endpoint,_data)=>{
const [response,setResponse]=useState(null);
//const [error,setError]=useState(null);
const [loading,setLoading]=useState(false);
useEffect(()=>{
    const abortController=new AbortController();
    const signal=abortController.signal;
    const doAxios= async () =>{
        setLoading(true);
        try
        {
            const res = await apiReqeust.httpRequest(
                _endpoint.httpVerb,
                _data,
                utils.appendHeader(_endpoint),
                _endpoint.url
              );
              if (!signal.aborted) {
                setResponse(res);
              }
        }
        catch(exception)
        {
                if(!signal.aborted)
                {
                   setResponse(Response.error(exception));
                }
        }
        finally
        {
            if (!signal.aborted) {
                setLoading(false);
              }
        }
    };
    doAxios();
    return () => {
        abortController.abort();
      };
},[]);
return {response,loading};
};
export default useAxios;