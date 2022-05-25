import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton';
import style from '../../styles/global.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import axios from 'axios';
import { useRouter } from 'next/router';


const createAlbumFormSchema = yup.object({
  name: yup.string().required('You need to enter a name'),
  artist: yup.string().required('You need to enter a artist.'),
}).required();

export interface CreateAlbumFormProps {
  name: string
  artist: string
}

const CreateAlbum = () => {
  const [file, setFile] = useState('')
  const [avatarPreview, setAvatar] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { profile } = useTypedSelector(state => state.user)
  const { register, handleSubmit, formState: { errors } } = useForm<CreateAlbumFormProps>({
    resolver: yupResolver(createAlbumFormSchema)
  });

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0])
      setAvatar(file)
      setFile(event.target.files[0])
    }
  }
  const onSubmit = (data: CreateAlbumFormProps) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('artist', data.artist)
    formData.append('photo', file)
    formData.append('userId', profile._id)
    file && axios.post('http://localhost:5000/albums', formData)
      .then(resp => router.push('/'))
      .catch(e => console.log(e))
    setLoading(false)
    setAvatar('error')
  }


  return (
    <MainLayout title={"Spotify - Web Player"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel>avatar</InputLabel>
        <Box mb={3}>
          <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: 'none'}}  />
          <label htmlFor="upload">
            <IconButton style={{ padding: 0 }} color="primary" aria-label="upload picture" component="span">
              <img className={style.albumPhotoPreview} src={avatarPreview !== null && avatarPreview &&  avatarPreview !== 'error'  ? avatarPreview : "https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=612x612&w=0&h=jPhUdbj_7nWHUp0dsKRf4DMGaHiC16kg_FSjRRGoZEI="} />
            </IconButton>
          </label>
          <label htmlFor="avatar" />
        </Box>
        <Typography color="error">{avatarPreview === 'error' && !file && 'You need to enter a photo'}</Typography>
        <InputLabel>album name</InputLabel>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          error={!!errors.name}
          {...register("name")}
        />
        <Typography color="error">{errors.name?.message}</Typography>

        <InputLabel>artist name</InputLabel>
        <TextField
          margin="dense"
          label="artist name"
          type="text"
          fullWidth
          variant="outlined"
          error={!!errors.artist}
          {...register("artist")}
        />
        <Typography color="error">{errors.artist?.message}</Typography>
        <LoadingButton
          loading={loading}
          sx={{ marginTop: 2, background: '#000' }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Create a new album
        </LoadingButton>
      </form>

    </MainLayout>
  )
}

export default CreateAlbum