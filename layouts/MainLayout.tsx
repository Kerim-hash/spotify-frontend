import React, { useEffect } from 'react';
import Player from "../components/Player";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from "next/router";
import Head from "next/head";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import style from '../styles/global.module.scss'
import ArrowBackI from '@mui/icons-material/ArrowBackIosRounded';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useDebounce } from '../hooks/useDebounce';
import { NextThunkDispatch, wrapper } from '../store';
import Link from 'next/link'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { theme } from './theme';
import { useDispatch } from 'react-redux';
import { getProfile } from '../store/actions-creators/users';
import ProfileSelect from '../components/profileSelect';
import PrivateModal from '../components/privateModal';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    search?: boolean
}
const drawerWidth = 241;

const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Search', href: '/search/' },
    { text: 'Track list', href: '/tracks' },
]

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords, search = false }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = React.useState<string>("");
    let handleChange = (search) => setSearchText(search)
    const debounceChange = useDebounce(handleChange, 500);
    const handleChangeSearch = (e) => {
        debounceChange(e.target.value);
    };

    React.useEffect(() => {
        if (searchText) {
            router.push('/search/' + searchText)
        }
    }, [searchText])
    const { profile } = useTypedSelector(state => state.user)

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('token')) {
                dispatch(getProfile())
            }
        }
    }, [])

    return (
        <>
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icons" href="../" />
            </Head>
            <ThemeProvider theme={theme}>
                <Container style={{ margin: '90px 0' }}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <AppBar
                            position="fixed"
                            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                        >
                            <Toolbar sx={{ bgcolor: "#423082" }}>
                                <Box display="flex" alignItems="center">

                                    {router.pathname !== "/" && (
                                        <IconButton onClick={() => router.back()}><ArrowBackI /></IconButton>
                                    )}
                                    {/* {router.pathname !== "/" && (
                                        // <button onClick={() => router.}>next</button>
                                    )} */}
                                    {search && <OutlinedInput
                                        fullWidth
                                        // className={classes.outlinedInput}
                                        placeholder="Artists, songs, or prodcasts"
                                        onChange={handleChangeSearch}
                                        // onFocus={() => setFocus(true)}
                                        sx={{ borderRadius: 30, width: 370, height: 40, background: '#fff', color: '#000' }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon color="secondary" />
                                            </InputAdornment>
                                        }
                                    />}
                                </Box>
                                <Box style={{ marginLeft: 'auto' }} display="flex" alignItems="center" gap={5}>
                                    {profile ? <ProfileSelect profile={profile} /> : <>
                                        <Link href="/register">
                                            <Button>Sign Up</Button>
                                        </Link>
                                        <Link href="/login">
                                            <Button variant="contained">Log in</Button>
                                        </Link>
                                    </>}
                                </Box>

                            </Toolbar>
                        </AppBar>
                        <Drawer
                            sx={{
                                width: drawerWidth,
                                flexShrink: 0,
                                '& .MuiDrawer-paper': {
                                    padding: '0px 5px',
                                    width: drawerWidth,
                                    boxSizing: 'border-box',
                                },
                            }}
                            variant="permanent"
                            anchor="left"
                        >
                            <svg viewBox="0 0 1134 340" className={style.logo}><title>Spotify</title><path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"></path></svg>
                            <List>
                                {menuItems.map(({ text, href }, index) => (
                                    <ListItem button key={href} onClick={() => router.push(href)}>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <HomeIcon fontSize="large" /> : <SearchIcon fontSize="large" />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                        <Box
                            component="main"
                            sx={{bgcolor: 'background.default', p: 3 }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Container>
                <Player />
                <PrivateModal  />
            </ThemeProvider>
        </>
    );
};

export default MainLayout;



