import React from 'react';
import {useRouter} from "next/router";
import Box from '@mui/material/Box';
import MainLayout from '../layouts/MainLayout';
import { useTypedSelector } from '../hooks/useTypedSelector';
import AlbumList from '../components/Album';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchAlbums } from '../store/actions-creators/album';

const Albums = () => {
    const router = useRouter()
    const {albums, error} = useTypedSelector(state => state.album)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title={"Spotify - Web Player"}>
            <Box display="flex" flexWrap="wrap" gap={2} >
            {albums.map(item => {
                return <AlbumList album={item}/>
            })}
            </Box>
        </MainLayout>
    );
};

export default Albums;

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbums())
})
