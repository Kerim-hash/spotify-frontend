import { Dispatch } from "react";
import { instance } from "../../core/axios";
import { AuthAction, AuthActionTypes, FormState, LoginFormProps, RegisterFormProps } from "../../types/auth";

export const fetchLogin = (payload: LoginFormProps) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await instance.post('http://localhost:5000/auth/login', payload)
            dispatch({ type: AuthActionTypes.FETCH_LOGIN, payload: response.data.user })
            instance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
            if (typeof window !== 'undefined') {
                return localStorage.setItem('token', JSON.stringify(response.data.accessToken))
            }
        } catch ({ response }) {
            dispatch({
                type: AuthActionTypes.FETCH_ERROR_LOGIN,
                payload: response.data.message
            })
        }
    }
}

export const fetchRegister = (payload: RegisterFormProps) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await instance.post('http://localhost:5000/auth/register', payload)
            dispatch({ type: AuthActionTypes.FETCH_REGISTER, payload: response.data })
            instance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
            if (typeof window !== 'undefined') {
                return localStorage.setItem('token', JSON.stringify(response.data.accessToken))
            }
        } catch ({ response }) {
            dispatch({
                type: AuthActionTypes.FETCH_ERROR_REGISTER,
                payload: response.data.message
            })
        }
    }
}

export const setLoadingState = (payload: FormState) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({ type: AuthActionTypes.SET_LOADING_STATE_ACTION, payload: payload })
    }
}
