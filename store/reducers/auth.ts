import { AuthAction, AuthActionTypes, AuthState, FormState } from "../../types/auth";

const initialState: AuthState = {
    loginError: '',
    registerError: '',
    user: null,
    formState: FormState.NEVER,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.FETCH_REGISTER:
            return { ...state, user: action.payload, formState: FormState.SUCCESS, registerError: '' }
        case AuthActionTypes.FETCH_LOGIN:
            return { ...state, user: action.payload, formState: FormState.SUCCESS, loginError: '' }
        case AuthActionTypes.FETCH_ERROR_LOGIN:
            return { ...state, loginError: action.payload, formState: FormState.ERROR }
        case AuthActionTypes.FETCH_ERROR_REGISTER:
            return { ...state, registerError: action.payload, formState: FormState.ERROR }
        case AuthActionTypes.SET_LOADING_STATE_ACTION:
            return { ...state, formState: action.payload }
        default:
            return state
    }
}
