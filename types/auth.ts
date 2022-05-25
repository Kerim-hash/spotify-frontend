import { IUser } from "./user"

export interface RegisterFormProps {
    email: string
    fullname: string
    password: string
    password2?: string
}

export interface LoginFormProps {
    email: string
    password: string
}

export interface AuthState {
    loginError: string;
    formState: FormState;
    registerError: string;
    user: any
}

export enum FormState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    NEVER = "NEVER",
}



export enum AuthActionTypes {
    FETCH_REGISTER = 'FETCH_REGISTER',
    FETCH_ERROR_REGISTER = 'FETCH_ERROR_REGISTER',
    FETCH_LOGIN = 'FETCH_LOGIN',
    FETCH_ERROR_LOGIN = 'FETCH_ERROR_LOGIN',
    SET_LOADING_STATE_ACTION = 'SET_LOADING_STATE_ACTION',
}

interface SetLoadingStateAction {
    type: AuthActionTypes.SET_LOADING_STATE_ACTION;
    payload: FormState
}


interface FetchRegisterAction {
    type: AuthActionTypes.FETCH_REGISTER;
    payload: any,
}

interface FetchRegisterErrorAction {
    type: AuthActionTypes.FETCH_ERROR_REGISTER;
    payload: string,
}

interface FetchLoginAction {
    type: AuthActionTypes.FETCH_LOGIN;
    payload: LoginFormProps
}

interface FetchLoginErrorAction {
    type: AuthActionTypes.FETCH_ERROR_LOGIN;
    payload: string
  
}

export type AuthAction = FetchLoginAction | FetchRegisterAction | FetchLoginErrorAction | FetchRegisterErrorAction | SetLoadingStateAction