import {apiReqeust,utils,Response} from 'Helpers/';
import endpoint from 'Config/endpoint';

 const commonAction = (_endpoint,_data) => {
	return async (dispatch) => {
		
		try
		{
		_data=null;	
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
		}
		catch(exception)
		{
			const res=Response.error(exception);
			dispatch({
				type:_endpoint.actionType,
                payload: res,
                actualActionType:_endpoint.actualActionType
			});
		}
	};
};
export default commonAction;