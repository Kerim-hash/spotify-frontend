import {Dispatch} from "react";
import { instance } from "../../core/axios";
import { ServerState, UpdateUserFormProps, UserAction, UserActionTypes } from "../../types/user";

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await instance.get('http://localhost:5000/users')
            dispatch({type: UserActionTypes.SET_ALL_USERS, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: 'An error occurred while loading users'
            })
        }
    }
}

export const getProfile = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await instance.get('http://localhost:5000/users/profile')
            dispatch({type: UserActionTypes.SET_PROFILE, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.SET_GET_PROFILE_ERROR,
                payload: 'error'
            })
        }
    }
}

export const setServerState = (payload: ServerState) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_SERVER_STATE, payload: payload })
    }
}

export const setProfile = (payload) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.SET_PROFILE, payload: payload })
    }
}


export const UpdateUser = (payload: FormData) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            
            const response = await instance.put('http://localhost:5000/users/profile/update', payload)
            dispatch({type: UserActionTypes.SET_UPDATE_USER, payload: response.data})
        } catch ({response}) {
            dispatch({
                type: UserActionTypes.SET_UPDATE_ERROR_USER,
                payload: response.data.message
            })
        }
    }
}
