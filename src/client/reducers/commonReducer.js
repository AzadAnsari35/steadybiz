export const reducerState=(state = null, action) => {
    return { ...state, items: action.payload };
  }

 export const createFilteredReducer = (reducerFunction, reducerPredicate) => {
    return (state, action) => {
        const isInitializationCall = state === undefined;
        const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
        return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
    }
}
    export default {reducerState,createFilteredReducer}; 