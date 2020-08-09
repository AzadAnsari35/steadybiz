import { apiReqeust, utils, Response } from 'Helpers/';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { loaderTypes } from 'Constants/commonConstant';

import store from "App/store/createStore";
import { getDataFromRedux } from 'Helpers/global';

export const commonActionWithoutApi=(_endpoint,_data) =>
{
	return (dispatch)=>{
    const res=Response.success(_data);
    console.log(_endpoint.actionType);
	dispatch({
		type:_endpoint.actionType,
		payload: res,
		actualActionType:_endpoint.actualActionType
	});
};

};
  export const  commonAction = (_endpoint, _data, _loaderData = {}) => {
	const { loaderType, ...rest } = _loaderData;
	const state = store.getState();
	const loaderStatus = state[endpointWithoutApi.loader.loaderStatus.reducerName];
	let callsCount = !!getDataFromRedux(loaderStatus) ? getDataFromRedux(loaderStatus).asyncCallInProgress : 0;

	return async (dispatch) => {
		try {
			// callsCount++;
			dispatch(
				commonActionWithoutApi(
					endpointWithoutApi.loader.loaderStatus,
					{
						loaderType: !!_loaderData.loaderType ? loaderType : loaderTypes.primary,
						isLoaderVisible: true,
						// asyncCallInProgress: callsCount,
						asyncCallInProgress: !!getDataFromRedux(loaderStatus) ? getDataFromRedux(loaderStatus).asyncCallInProgress + 1 : 1,
						...rest,
					}
				)
			);
			const res = await apiReqeust.httpRequest(
				_endpoint.httpVerb,
				_data,
				utils.appendHeader(_endpoint),
				_endpoint.url
			);
			//if (!!res && res.status === 200) {
				dispatch({
					type:_endpoint.actionType,
					payload: res,
					actualActionType:_endpoint.actualActionType
				});
			// }
			// else if (!!res) {
			// 	dispatch({
			// 		type: ACTION_TYPES.GET_CONTRIES_LIST_FAILURE,
			// 		payload: res.data,
			// 	});
			// }
		} catch (exception) {
			const res=Response.error(exception);
			dispatch({
				type:_endpoint.actionType,
				payload: res,
				actualActionType:_endpoint.actualActionType
			});
		} finally {
			// callsCount--;
			dispatch(
				commonActionWithoutApi(
					endpointWithoutApi.loader.loaderStatus,
					{
						loaderType: !!_loaderData.loaderType ? loaderType : loaderTypes.primary,
						isLoaderVisible: false,
						// asyncCallInProgress: callsCount,
						// asyncCallInProgress: getDataFromRedux(loaderStatus).asyncCallInProgress - 1,
						asyncCallInProgress: !!getDataFromRedux(loaderStatus) ? getDataFromRedux(loaderStatus).asyncCallInProgress - 1 : 0,
						...rest,
					}
				)
			);
		}
	};
};

store.subscribe(commonAction);
