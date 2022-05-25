import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import style from '../styles/global.module.scss';
import { useRouter } from 'next/router';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';

export default function AlbumList({ album }) {
    const router = useRouter()
    const [state, setState] = useState<boolean>(false)
    const onMouseOver = () => setState(true);
    const onMouseOut = () => setState(false);
    return (
        <Card sx={{ maxWidth: 200, position: 'relative' }} onClick={() => router.push(`/${album._id}`)} 
            onMouseOut={onMouseOut}
            raised={state}
            >
            <CardContent   onMouseOver={onMouseOver}>
            <Box className={style.albumPhoto} >
                <img src={'http://localhost:5000/' + album.photo} />
            </Box>
               {/* {state && <Box className={style.playButton}>
                <PlayArrow />
                </Box>} */}
                <Typography gutterBottom variant="body1" style={{ fontWeight: 'bold' }}>
                    {album.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {album.artist}
                </Typography>

            </CardContent>
        </Card>
    );
}
