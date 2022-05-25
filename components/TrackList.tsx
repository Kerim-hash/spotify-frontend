import React from 'react';
import { ITrack } from "../types/track";
import TrackItem from "./TrackItem";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small" >
                <TableHead >
                    <TableRow>
                        <TableCell># TITLE</TableCell>
                        <TableCell align="left">ALBUM</TableCell>
                        <TableCell align="left">DATE ADDED</TableCell>
                        <TableCell align="left"><AccessTimeRoundedIcon /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks.map((track) => (
                        <TrackItem
                            key={track._id}
                            track={track}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TrackList;
