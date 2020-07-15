import {combineReducers} from 'redux';

import {actionTypeConstant} from "Constants/";
import  {reducerState,createFilteredReducer} from './commonReducer';

// export default combineReducers({
//     listData: demoListReducer
  
// });


const rootReducer = combineReducers({  
    usersSignIn : createFilteredReducer(reducerState, action => action.type === actionTypeConstant.users.signIn)
})
export default rootReducer;