/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import { apiReqeust, utils, Response } from 'Helpers/';
const useAsyncEndpoint = (fn) => {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false,
  });
  const [req, setReq] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!req) return;
    // console.log('hi', req);
    const doAxios = async () => {
      //   setLoading(true);
      try {
        // console.log(req.data.request);
        const res = await apiReqeust.httpRequest(
          req._endpoint.httpVerb,
          req.data,
          utils.appendHeader(req._endpoint),
          req._endpoint.url
        );
        if (!signal.aborted) {
          console.log(res);
          setRes(res);
        }
      } catch (exception) {
        if (!signal.aborted) {
          setRes(Response.error(exception));
        }
      } finally {
        if (!signal.aborted) {
          //     setLoading(false);
        }
      }
    };
    doAxios();
    return () => {
      abortController.abort();
    };
  }, [req]);

  return [res, (...args) => setReq(fn(...args))];
};
export default useAsyncEndpoint;
