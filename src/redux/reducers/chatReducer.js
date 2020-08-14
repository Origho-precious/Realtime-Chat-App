
export const signinReducer = (state = null, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return action.payload
        default:
            return state
    }
}

export const messageReducer = (state = null, action) => {
    switch(action.type){
        case 'SEND_MESSAGE':
            return action.payload
        case 'FETCH_MESSAGES':
            return action.payload
        default:
            return state
    }
}