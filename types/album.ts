import { ITrack } from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    artist: string;
    photo: string;
    tracks: ITrack[];
}

export interface AlbumState {
    albums: IAlbum[];
    error: string;
}

export enum AlbumActionTypes {
    FETCH_ALBUM = 'FETCH_ALBUM',
    FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR',
}

interface FetchAlbumAction {
    type: AlbumActionTypes.FETCH_ALBUM;
    payload: IAlbum[]
}

interface FetchAlbumErrorAction {
    type: AlbumActionTypes.FETCH_ALBUM_ERROR;
    payload: string
}

export type AlbumAction = FetchAlbumErrorAction | FetchAlbumAction
