import { ServerState, UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
    profile: null,
    error: '',
    users: [],
    serverState: ServerState.NEVER,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_ALL_USERS:
            return { ...state, error: '', users: action.payload }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { ...state, error: action.payload, serverState: ServerState.ERROR }
        case UserActionTypes.SET_PROFILE:
            return { ...state, profile: action.payload }
        case UserActionTypes.SET_UPDATE_USER:
            return { ...state, profile: action.payload, serverState: ServerState.SUCCESS }
        case UserActionTypes.SET_GET_PROFILE_ERROR:
            return { ...state, error: action.payload,serverState: ServerState.ERROR }
        case UserActionTypes.SET_SERVER_STATE:
            return { ...state, serverState: action.payload}
        default:
            return state
    }
}
