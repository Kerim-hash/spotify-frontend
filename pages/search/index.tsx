import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import TrackList from '../../components/TrackList'
import MainLayout from '../../layouts/MainLayout'
import { wrapper } from '../../store'

const index = () => {
    return (
        <MainLayout title={"Spotify - Search"} search>
             {/* <TrackList tracks={data}/> */}
             
        </MainLayout>
    )
}

export default index


