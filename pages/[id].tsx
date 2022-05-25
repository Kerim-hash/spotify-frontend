import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import style from '../styles/global.module.scss';
import TrackList from '../components/TrackList'
import MainLayout from '../layouts/MainLayout'
import { TrackActionTypes } from '../types/track'
import { NextThunkDispatch, wrapper } from '../store'
const Album = ({ serverAlbum }) => {
    return (
        <MainLayout title={"Spotify - " + serverAlbum.name}>
            <Box display="flex" alignItems="flex-end" mb={4}>
                <img className={style.albumPhotoPreview} src={'http://localhost:5000/' + serverAlbum.photo} />
                <Box display="flex" flexDirection="column" ml={2}>
                    <Typography variant="body2">ALBUM</Typography>
                    <Typography variant="h1" style={{fontWeight: 'bold'}}>{serverAlbum.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {serverAlbum.artist}
                    </Typography>
                </Box>
            </Box>
            <TrackList tracks={serverAlbum.tracks}/>
        </MainLayout>
    )
}

export default Album


export const getServerSideProps = wrapper.getServerSideProps(async ({store, params}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    const response = await axios.get('http://localhost:5000/albums/' + params.id)
    dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data.tracks})
    return {
        props: {
            serverAlbum: response.data
        }
    }
})