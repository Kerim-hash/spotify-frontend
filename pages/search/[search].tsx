import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import TrackList from '../../components/TrackList'
import MainLayout from '../../layouts/MainLayout'
import { wrapper } from '../../store'

const index = ({data}) => {
    console.log(data)
    return (
        <MainLayout title={"Spotify - Search"} search>
             <TrackList tracks={data}/>
        </MainLayout>
    )
}

export default index


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/search?query=' + params.search)
    return {
        props: {
            data: response.data
        }
    }
}
