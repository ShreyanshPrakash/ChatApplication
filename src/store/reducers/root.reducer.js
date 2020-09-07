import {
    combineReducers,
} from 'redux';

import {
    ChatReducer,
} from 'src/store/reducers/chat.reducer';


export const rootReducer = combineReducers({
    chatState:  ChatReducer,
});


