/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import endpointWithoutApi from 'Config/endpointWithoutApi';
import { loaderTypes } from 'Constants/commonConstant';
import { apiReqeust, utils, Response } from 'Helpers/';
import { getDataFromRedux } from 'Helpers/global';
import { commonActionWithoutApi } from 'Actions';

const useAsyncEndpoint = (fn) => {
  const dispatch = useDispatch();
  const [res, setRes] = useState(null);
  const [req, setReq] = useState();
  const loaderStatus = useSelector(
    (state) => state[endpointWithoutApi.loader.loaderStatus.reducerName]
  );

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!req) return;
    //console.log('hi', req);
    const doAxios = async () => {
      //   setLoading(true);
      try {
        if (req.isHideLoader == undefined) {
          dispatch(
            commonActionWithoutApi(endpointWithoutApi.loader.loaderStatus, {
              loaderType: loaderTypes.primary,
              isLoaderVisible: true,
              asyncCallInProgress: getDataFromRedux(loaderStatus)
                ? getDataFromRedux(loaderStatus).asyncCallInProgress + 1
                : 1,
            })
          );
        }
        const result = await apiReqeust.httpRequest(
          req._endpoint.httpVerb,
          req.data,
          utils.appendHeader(req._endpoint),
          req._endpoint.url
        );
        if (!signal.aborted) {
          // console.log(res);
          setRes(result);
          //console.log(res);
        }
      } catch (exception) {
        if (!signal.aborted) {
          setRes(Response.error(exception));
        }
      } finally {
        if (!signal.aborted) {
          //     setLoading(false);
        }
        if (req.isHideLoader == undefined) {
          dispatch(
            commonActionWithoutApi(endpointWithoutApi.loader.loaderStatus, {
              loaderType: loaderTypes.primary,
              isLoaderVisible: false,
              asyncCallInProgress: getDataFromRedux(loaderStatus)
                ? getDataFromRedux(loaderStatus).asyncCallInProgress - 1
                : 0,
            })
          );
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
