import { AlbumAction, AlbumActionTypes, AlbumState } from "../../types/album";

const initialState: AlbumState = {
    albums: [],
    error: ''
}

export const albumReducer = (state = initialState, action: AlbumAction): AlbumState => {
    switch (action.type) {
        case AlbumActionTypes.FETCH_ALBUM_ERROR:
            return { ...state, error: action.payload }
        case AlbumActionTypes.FETCH_ALBUM:
            return { error: '', albums: action.payload }
        default:
            return state
    }
}
