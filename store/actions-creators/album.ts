import {Dispatch} from "react";
import { AlbumAction, AlbumActionTypes } from "../../types/album";
import { instance } from "../../core/axios";

export const fetchAlbums = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await instance.get('http://localhost:5000/albums')
            dispatch({type: AlbumActionTypes.FETCH_ALBUM, payload: response.data})
        } catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUM_ERROR,
                payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}
