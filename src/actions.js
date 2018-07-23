
export const LOGIN_EVENT = 'LOGIN_EVENT'
export const CLICK_LOGIN_EVENT = 'CLICK_LOGIN_EVENT'
export const LOGOUT_EVENT = 'LOGOUT_EVENT'
export const SET_BASE_POS ='SET_BASE_POS'
export const FIRE_EVENT='FIRE_EVENT'
export const UPDATE_FIRE ='UPDATE_FIRE'
export const SET_LEVEL_EVENT = "SET_LEVEL_EVENT"


export function login(data) {
    return {
        type: LOGIN_EVENT,
        payload: data
    }
}

export function clickLogin(data) {
    return {
        type: CLICK_LOGIN_EVENT,
        payload: data
    }
}

export function logout() {
    return {
        type: LOGOUT_EVENT,
    }
}

export function setLevel(data) {
    return {
        type: SET_LEVEL_EVENT,
        payload: data
    }
}


export function setBasePos(data) {
    return {
        type: SET_BASE_POS,
        payload: data
    }
}

export function fireEvent(data, time) {
    return {
        type: LOGIN_EVENT,
        payload: data
    }
}

export function updateFire(data) {
    return {
        type: LOGIN_EVENT,
        payload: data
    }
}