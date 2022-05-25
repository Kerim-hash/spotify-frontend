import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import TrackList from '../../components/TrackList'
import MainLayout from '../../layouts/MainLayout'
import style from '../../styles/global.module.scss';
const Album = ({ serverAlbum }) => {
    return (
        <MainLayout title={"Spotify - "}>
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



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get('http://localhost:5000/albums/' + params.id)
    return {
        props: {
            serverAlbum: response.data
        }
    }
}
