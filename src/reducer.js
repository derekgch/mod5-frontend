



const initialState = {
    showLoginPage: false,
    currentUserId: null,
    currentUserName: null,
    basePos: 500,
    fired: [],
    lastFired: null,
}


function reducer (state = initialState, action) {

        console.log('state', state);
        console.log('action', action);

    
        switch(action.type) {
            case "CLICK_EVENT":
                const { data } = action.payload;
                let found = state.shows.find( e => e.id === data)
                return {...state, selectedShow: found }

            case "CLICK_LOGIN_EVENT":
                return { ...state, showLoginPage: action.payload.data }

            case "LOGIN_EVENT":
                return { ...state, 
                    currentUserId: action.payload.data.id, 
                    currentUserName: action.payload.data.user_name,
                    showLoginPage: false }
            case "LOGOUT_EVENT":
                return { ...state, currentUserId: null, currentUserName: null}
            
            case "SET_BASE_POS":
                return {...state, basePos: action.payload.data}
            case "MOVE_EVENT":
                    let pos = state.basePos - action.payload.data.value
                    if(!action.payload.data.left)
                        {pos = state.basePos + action.payload.data.value}
                return {...state, basePos: pos }
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