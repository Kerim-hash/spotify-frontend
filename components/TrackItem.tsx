import React from 'react';
import { ITrack } from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import { useRouter } from "next/router";
import { useActions } from "../hooks/useActions";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pause from '@mui/icons-material/PauseCircleFilledRounded';
import Delete from '@mui/icons-material/DeleteRounded';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        pauseTrack()
    }

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}   >
            <TableCell align="left">
                <Box display="flex">
                    <IconButton onClick={play} >
                        {!active
                            ? <PlayArrow />
                            : <Pause />
                        }
                    </IconButton>
                    <img width={40} height={40} src={'http://localhost:5000/' + track.picture} style={{ objectFit: 'cover' }} />
                    <Box display="flex" flexDirection="column" ml={1}>
                        <Typography variant="h6" noWrap>{track.name}</Typography>
                        <Typography variant="caption" style={{ fontSize: 12, color: 'gray' }}>{track.artist}</Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="left">ALBUM</TableCell>
            <TableCell align="left">DATE ADDED</TableCell>
            <TableCell align="left">time</TableCell>
        </TableRow>
    );
};

export default TrackItem;
