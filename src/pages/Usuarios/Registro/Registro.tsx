import React, { useContext, useState } from 'react'
import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Card,
	Tooltip,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { Usuario } from '../../../interfaces/usuarios'

type FormValues = {
	nombre: string
	apellido: string
	email: string
	password: string
	confirmar: string
}

export const Registro = () => {
	// const [user, setUser] = useState<Usuario>({
	// 	nombre: '',
	// 	apellido: '',
	// 	email: '',
	// 	password: '',
	// })
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm<FormValues>()

	const { registrar } = useContext(AuthContext)

	const onSubmit = handleSubmit((data) => {
		console.log(data)
		registrar(data)
		reset()
	})

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
					variant="outlined"
					sx={{
						width: '700px',
						height: 'auto',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: '15px',
						padding: '30px',
					}}
				>
					<form onSubmit={onSubmit}>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								{...register('nombre', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									minLength: {
										value: 3,
										message: 'El campo debe contener al menos 3 caracteres',
									},
									maxLength: {
										value: 15,
										message: 'El campo debe contener máximo 15 caracteres',
									},
								})}
								type="text"
								name="nombre"
								margin="dense"
								label="Nombre"
								autoComplete="off"
								sx={{ marginTop: '35px', width: '400px' }}
							/>
							{errors.nombre && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.nombre.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								{...register('apellido', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									minLength: {
										value: 3,
										message: 'El campo debe contener al menos 3 caracteres',
									},
									maxLength: {
										value: 15,
										message: 'El campo debe contener máximo 15 caracteres',
									},
								})}
								type="text"
								name="apellido"
								margin="dense"
								fullWidth
								label="Apellido"
								sx={{ marginTop: '35px', width: '400px' }}
							/>
							{errors.apellido && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.apellido.message}
								</Typography>
							)}
						</Grid>
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
								type="text"
								name="email"
								margin="dense"
								fullWidth
								label="Correo"
								sx={{ marginTop: '35px', width: '400px' }}
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
									pattern: {
										value:
											/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm,
										message:
											'Mínimo 6 caracteres, al menos una mayúscula y minúscula. Puede contener caracteres especiales',
									},
								})}
								type="password"
								name="password"
								margin="dense"
								fullWidth
								label="Contraseña"
								sx={{ marginTop: '35px', width: '400px' }}
							/>
							{/* <Tooltip
								placement="right"
								disableFocusListener
								disableTouchListener
								title="hola no se"
							>
								<p>Al menos ocho caracteres</p>
							</Tooltip> */}
							{errors.password && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
								{...register('confirmar', {
									required: {
										value: true,
										message: 'Campo requerido',
									},
									validate: (val: string) => {
										if (watch('password') != val) {
											return 'Las contraseñas no coinciden'
										}
									},
								})}
								type="password"
								name="confirmar"
								margin="dense"
								fullWidth
								label="Confirmar"
								sx={{ marginTop: '35px', width: '400px' }}
							/>
							{errors.confirmar && (
								<Typography sx={{ color: 'error.main' }}>
									{errors.confirmar.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								sx={{ marginTop: '35px' }}
							>
								Registrar
							</Button>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<Typography>
								<Link to={'/login'}>¿Ya tienes una cuenta? Ingresa!</Link>
							</Typography>
						</Grid>
					</form>
				</Card>
			</Grid>
		</Box>
	)
}
