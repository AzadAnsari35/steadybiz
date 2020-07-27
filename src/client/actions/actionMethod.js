import {apiReqeust,utils,Response} from 'Helpers/';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { loaderTypes } from 'Constants/commonConstant';

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
	return async (dispatch) => {
		try {
			dispatch(
				commonActionWithoutApi(
					endpointWithoutApi.loader.loaderStatus,
					{
						loaderType: !!_loaderData.loaderType ? loaderType : loaderTypes.primary,
						isLoaderVisible: true,
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
			dispatch(
				commonActionWithoutApi(
					endpointWithoutApi.loader.loaderStatus,
					{
						loaderType: loaderTypes.primary,
						isLoaderVisible: false,
					}
				)
			);
		}
	};
};
