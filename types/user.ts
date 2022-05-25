import { IAlbum } from "./album";
import { ITrack } from "./track";


export interface UpdateUserFormProps {
    email: string
    fullname: string
    password: string
    avatar: any,
    isSinger?: boolean;
}


export interface IUser {
    _id: string;
    email: string
    fullname: string;
    password?: string;
    avatar?: string;
    isAdmin?: boolean;
    isSinger?: boolean;
    tracks?: ITrack[];
    albums?: IAlbum[];
}

export interface UserState {
    profile: IUser;
    error: string;
    users: IUser[];
    serverState: ServerState
}

export enum ServerState {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    LOADING = "LOADING",
    NEVER = "NEVER",

}

export enum UserActionTypes {
    SET_PROFILE = 'SET_PROFILE',
    SET_GET_PROFILE_ERROR = 'SET_GET_PROFILE_ERROR',
    SET_ALL_USERS = 'SET_ALL_USERS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    SET_SERVER_STATE = 'SET_SERVER_STATE',
    SET_UPDATE_USER = 'SET_UPDATE_USER',
    SET_UPDATE_ERROR_USER = 'SET_UPDATE_ERROR_USER',
}

interface SetServerStateAction {
    type: UserActionTypes.SET_SERVER_STATE;
    payload: ServerState
}

interface SetProfileAction {
    type: UserActionTypes.SET_PROFILE;
    payload?: IUser;
}

interface SetAllUsersAction {
    type: UserActionTypes.SET_ALL_USERS;
    payload: IUser[];
}

interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}

interface setGetProfileErrorAction {
    type: UserActionTypes.SET_GET_PROFILE_ERROR;
    payload: string;
}

interface setUpdateUserErrorAction {
    type: UserActionTypes.SET_UPDATE_ERROR_USER;
    payload: string;
}
interface setUpdateUserAction {
    type: UserActionTypes.SET_UPDATE_USER;
    payload: IUser;
}

export type UserAction = SetProfileAction |
    SetAllUsersAction |
    FetchUsersErrorAction |
    setGetProfileErrorAction |
    SetServerStateAction |
    setUpdateUserErrorAction |
    setUpdateUserAction