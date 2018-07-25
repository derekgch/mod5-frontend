



const initialState = {
    showLoginPage: false,
    currentUserId: null,
    currentUserName: null,
    basePos: 500,
    fired: [],
    lastFired: null,
    isMath: false,
    digits: 1,
    box: 1,
    lvl: 0,
}


function reducer (state = initialState, action) {

        // console.log('state', state);
        // console.log('action', action);

    
        switch(action.type) {

            case "SET_LEVEL_EVENT":
                console.log("action", action.payload)
                let {digits, box, lvl} = action.payload;
                return {...state, digits, box , lvl }

            case "CLICK_LOGIN_EVENT":
                
                return { ...state, showLoginPage: action.payload }

            case "LOGIN_EVENT":

                return { ...state, 
                    currentUserId: action.payload.id, 
                    currentUserName: action.payload.user_name,
                    showLoginPage: false }
            case "LOGOUT_EVENT":

                return { ...state, currentUserId: null, currentUserName: null}
            
            case "SET_BASE_POS":
                    
                return {...state, basePos: action.payload.data}

            case "FIRE_EVENT":

                return { ...state, fired: action.payload.data, lastFired: action.time }

            case 'UPDATE_FIRE':
                return {...state, fired: action.payload.data}
        //   case "SET_COUNTER":
        //     return { ...state, counter: action.payload.value }
            default:
            return state;
        }      
}

export default reducer;