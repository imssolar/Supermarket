import React, { useContext, useEffect } from 'react'
import { Button, TextField, Grid, Box, Typography, Card } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/AuthContext'

type FormValues = {
	email: string
	password: string
}

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const { iniciarSesion, token } = useContext(AuthContext)

	const onSubmit = handleSubmit((data) => {
		console.log(data)
		iniciarSesion(data)
		reset()
	})

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('token')) navigate('/')
	}, [token])

	return (
		<Box>
			<Grid
				container
				direction="column"
				spacing="2"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				minHeight={'90vh'}
			>
				<Card
					sx={{
						width: '700px',
						height: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: '20px',
					}}
				>
					<form onSubmit={onSubmit}>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								{...register('email', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message: 'El formato no es correcto',
									},
								})}
								type="email"
								name="email"
								margin="dense"
								fullWidth
								label="Correo"
								sx={{ marginTop: '25px', width: '400px' }}
							/>
							{errors.email && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.email.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								{...register('password', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									// pattern: {
									// 	value:
									// 		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm,
									// 	message:
									// 		'Mínimo 5 caracteres, al menos una mayúscula y minúscula. Puede contener caracteres especiales',
									// },
								})}
								type="password"
								name="password"
								margin="dense"
								fullWidth
								label="Contraseña"
								sx={{ marginTop: '35px', width: '400px' }}
							/>
							{errors.password && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={6}
							sx={{ marginTop: '20px', marginBottom: '20px' }}
						>
							<Button variant="contained" type="submit" fullWidth>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<Typography>
								<Link to={'/registro'}>¿Deseas crear una cuenta?</Link>
							</Typography>
						</Grid>
					</form>
				</Card>
			</Grid>
		</Box>
	)
}
