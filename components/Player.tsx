import React, { useEffect, useCallback } from 'react';
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Pause from '@mui/icons-material/PauseCircleFilledRounded';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import VolumeUp from '@mui/icons-material/VolumeUpRounded';
import { Box, Paper } from '@mui/material';
import VolumeOffIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeMuteIcon from '@mui/icons-material/VolumeMuteRounded';
import VolumeDownIcon from '@mui/icons-material/VolumeDownRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import Link from 'next/link';

let audio;

const Player = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { tracks } = useTypedSelector(state => state.track)
    const { profile } = useTypedSelector(state => state.user)
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()


    useEffect(() => {
        // if(audio === null) {
            if (!audio) {
                console.log('active')
                audio = new Audio()
            } else {
                setAudio()
                play()
                console.log('active 2')
            }
        // }else {
        //     audio = null 
        //     console.log('active 3')
        // }
    }, [active])

    useEffect(() => {
        if (currentTime === duration && duration !== 0) {
            if (currentIndex + 1 !== tracks.length) {
                setActiveTrack(tracks[currentIndex + 1])
            } else {
                setActiveTrack(tracks[0])
            }
            pauseTrack()
        }
    }, [currentTime === duration])

    const setAudio = () => {
        if (active !== null || active !== undefined && profile) {
            audio.src = 'http://localhost:5000/' + active?.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio?.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio?.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }


    const currentIndex = tracks?.findIndex(item => item._id === active?._id)

    const nextMusic = (e) => {
        e.stopPropagation()
        if (currentIndex + 1 !== tracks.length) {
            setActiveTrack(tracks[currentIndex + 1])
        } else {
            setActiveTrack(tracks[0])
        }
        playTrack()
    }

    const prevMusic = (e) => {
        e.stopPropagation()
        if (currentIndex !== 0) {
            setActiveTrack(tracks[currentIndex - 1])
        } else {
            setActiveTrack(tracks[tracks.length - 1])
        }
        playTrack()
    }

    if (!active) {
        return null
    }


    return (
        <Paper className={styles.player} style={{ background: !profile && 'linear-gradient(90deg,#af2896,#509bf5)', height: !profile && '66px' }}>
            {profile ?
                <>
                    <img src={'http://localhost:5000/' + active?.picture} alt="" className={styles.playerImg} />
                    <Box style={{ width: '15.5%', margin: '0 20px' }}>
                        <Typography variant="h6" noWrap>{active?.name}</Typography>
                        <Typography variant="caption" style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" style={{ margin: '0 auto' }}>
                        <Box display="flex" justifyContent="center">
                            <IconButton onClick={prevMusic} size="medium">
                                <SkipPreviousRoundedIcon />
                            </IconButton>
                            <IconButton onClick={play} >
                                {!pause
                                    ? <Pause />
                                    : <PlayArrow />
                                }
                            </IconButton>
                            <IconButton onClick={nextMusic} >
                                <SkipNextRoundedIcon />
                            </IconButton>
                        </Box>

                        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} width={500} time />
                    </Box>
                    <Box display="flex" alignItems="center" style={{ width: '20%' }}>
                        {volume === 0 ? <VolumeOffIcon style={{ marginLeft: 'auto', marginRight: '10px' }} /> : volume >= 1 && volume <= 30 ? <VolumeMuteIcon style={{ marginLeft: 'auto', marginRight: '10px' }} /> : volume >= 31 && volume <= 71 ? <VolumeDownIcon style={{ marginLeft: 'auto', marginRight: '10px' }} /> : <VolumeUp style={{ marginLeft: 'auto', marginRight: '10px' }} />}
                        <TrackProgress left={volume} right={100} onChange={changeVolume} width={100} />
                    </Box>
                </> : <Box display="flex" justifyContent="space-between" style={{ width: '100%' }}>
                    <Box display="flex" flexDirection="column">
                        <Typography variant='body2'>Preview of Spotify</Typography>
                        <Typography variant='body1'>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</Typography>
                    </Box>
                    <Link href="register">
                        <Button variant='contained'>Sign Up Free</Button>
                    </Link>
                </Box>}
        </Paper>
    );
};

export default Player;
