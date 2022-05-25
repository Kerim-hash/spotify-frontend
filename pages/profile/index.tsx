import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ModalBlock } from '../../components/Modal'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import { useDispatch } from 'react-redux'
import { setServerState, UpdateUser } from '../../store/actions-creators/users'
import { useRouter } from 'next/router'
import { ServerState } from '../../types/user'

const UpdateUserFormSchema = yup.object({
    email: yup.string().email('You need to enter your email.').required('You need to enter a email'),
    fullname: yup.string().required('You need to enter a fullname.')
}).required();


export interface UpdateUserFormProps {
    email: string
    fullname: string
}
const Profile = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [file, setFile] = useState('')
    const [avatarPreview, setAvatar] = useState('')
    const [open, setOpen] = useState(false);
    const [age, setAge] = React.useState('user');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserFormProps>({
        resolver: yupResolver(UpdateUserFormSchema)
    });

    const handleChange = function loadFile(event) {
        if (event.target.files.length > 0) {
            const file = URL.createObjectURL(event.target.files[0])
            setAvatar(file)
            setFile(event.target.files[0])
        }
    }

    const { profile, serverState } = useTypedSelector(state => state.user)

    const onSubmit = (data: UpdateUserFormProps) => {
        var formData = new FormData()
        formData.append("avatar", file)
        formData.append("isSinger", age === 'singer' ? 'true' : 'false')
        formData.append("email", data.email)
        formData.append("fullname", data.fullname)
        dispatch(setServerState(ServerState.LOADING))
        dispatch(UpdateUser(formData))
    }

    useEffect(() => {
        if (ServerState.SUCCESS === serverState) {
            setOpen(false)
        }
    }, [serverState])

    return (
        <MainLayout >
            <Box display="flex" alignItems="flex-end" mb={2}>
                <Avatar sx={{ width: 250, height: 250 }} id="avatar" src={'http://localhost:5000/' + profile?.avatar} />
                <Box display="flex" flexDirection="column" ml={3}>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>PROFILE</Typography>
                    <Typography variant="h1" style={{ fontWeight: 'bold' }}>{profile?.fullname}</Typography>
                    <IconButton onClick={handleClickOpen} sx={{ width: 'max-content' }}><EditOutlinedIcon /></IconButton>
                </Box>
            </Box>

            {profile?.isSinger && <Button onClick={() => router.push('/albums/create')}>
                Upload a album
            </Button>}
            {profile?.isSinger && <Button onClick={() => router.push('/tracks/create')}>
                Upload a track
            </Button>}

            <ModalBlock title="" visible={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel>avatar</InputLabel>
                    <Box mb={3}>
                        <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{ display: "none" }} />
                        <label htmlFor="upload">
                            <IconButton style={{ padding: 0 }} color="primary" aria-label="upload picture" component="span">
                                <Avatar sx={{ width: 150, height: 150 }} id="avatar" src={avatarPreview ? avatarPreview : 'http://localhost:5000/' + profile?.avatar} />
                            </IconButton>
                        </label>
                        <label htmlFor="avatar" />
                    </Box>
                    <InputLabel>email?</InputLabel>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        defaultValue={profile?.email}
                        error={!!errors.email}
                        {...register("email")}
                    />
                    <Typography color="error">{errors.email?.message}</Typography>
                    <InputLabel>fullname?</InputLabel>
                    <TextField
                        margin="dense"
                        id="name"
                        label="fullname"
                        type="text"
                        fullWidth
                        variant="outlined"
                        defaultValue={profile?.fullname}
                        error={!!errors.email}
                        {...register("fullname")}
                    />
                    <Typography color="error">{errors.fullname?.message}</Typography>
                    <InputLabel>Singer | User</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="Age"
                        fullWidth
                        defaultValue={profile?.isSinger ? 'singer' : 'user'}
                        onChange={handleChangeSelect}
                    >
                        <MenuItem value={'user'}>User</MenuItem>
                        <MenuItem value={'singer'}>Singer</MenuItem>
                    </Select>
                    <LoadingButton
                        loading={serverState === ServerState.LOADING}
                        disabled={serverState === ServerState.LOADING}
                        type="submit" sx={{ marginTop: 2 }}
                        fullWidth variant="contained"
                    >
                        Save
                    </LoadingButton>
                </form>
            </ModalBlock>
        </MainLayout>
    )
}

export default Profile