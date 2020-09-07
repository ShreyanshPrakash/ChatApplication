import {
    ChatModel,
} from 'src/models';

export const ChatReducer = ( state = new ChatModel(), {type,payload}) => {


    switch(type){

        case "One": {
            return{
                ...state,
            }
        }

        default: {
            return state;
        }
    }
}