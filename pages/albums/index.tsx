import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import Player from "../../components/Player";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions-creators/track";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AlbumList from '../../components/Album';
import { fetchAlbums } from '../../store/actions-creators/album';

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
            {albums.map(item => {
               return <AlbumList album={item}/>
            })}
        </MainLayout>
    );
};

export default Albums;

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbums())
})
