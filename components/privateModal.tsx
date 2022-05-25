import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Link from 'next/link';
import { useTypedSelector } from '../hooks/useTypedSelector';

const PrivateModal = () => {
    const {  active } = useTypedSelector(state => state.player)
    const { profile } = useTypedSelector(state => state.user)
    const [open, setOpen] = useState<boolean>(active && !profile)
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Box display="flex" alignItems="center">
                        <img width="300" height="300"  style={{borderRadius: 12, objectFit: 'cover'}}  src={'https://t.ctcdn.com.br/EE2NIW-3mH9dpX755eEo64cbmds=/512x288/smart/filters:format(webp)/i436354.jpeg'} alt="" />
                        <Box ml={3} style={{textAlign: 'center'}}>
                            <Typography variant="h4" style={{fontWeight: 'bold'}}>Start listening with a free Spotify account</Typography>
                            <Link href="register">
                            <Button color="primary" variant="contained">Sign Up Free</Button>
                            </Link>
                            <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
                            <Typography variant="body2">Already have an account?</Typography>
                             <Link href="login" >Log in</Link>
                            </Box>
                        </Box>
                    </Box>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default PrivateModal