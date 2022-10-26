import React, { useContext } from 'react'
import {
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Typography,
} from '@mui/material'
import { ProductosContext } from '../../../context/Productos/ProductosContext'
import { v4 as uuidv4 } from 'uuid'
import { Categoria, Unidad } from '../../../interfaces/listado'
import { Resolver, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const unidades: Unidad[] = [
	{ _id: '6349b4e8d6119057f090a9c5', tipo_unidad: 'KG' },
	{ _id: '6349b4ebd6119057f090a9c7', tipo_unidad: 'Unidad' },
]

const categorias: Categoria[] = [
	{ _id: '6349b41659c43a096dc24b0a', tipo_categoria: 'Bebidas' },
	{ _id: '6349c72d898fa9f578ceb988', tipo_categoria: 'Electrodomestico' },
]

type FormValues = {
	_id: string
	nombre: string
	precio_unitario: number
	unidad: Unidad
	categoria: Categoria
	codigo_barra: string
	total: string
	cantidad_unidades: number
	esta_en_carrito: false
	img: string
}

const resolver: Resolver<FormValues> = async (values) => {
	return {
		values: values.nombre ? values : {},
		errors: !values.nombre
			? { nombre: { type: 'required', message: 'El campo es requerido.' } }
			: {},
	}
}

export const CrearProducto = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ resolver }) //{ resolver }
	const onSubmit = handleSubmit((data) => {
		console.log('Ejecutando el onSubmit')
		data.total = (data.precio_unitario * data.cantidad_unidades).toString()
		data.esta_en_carrito = false
		data._id = uuidv4()
		agregarProducto(data)
		navigate('/')
		console.log('Producto a almacenar: ' + data)
	})

	const { agregarProducto } = useContext(ProductosContext)
	const navigate = useNavigate()

	return (
		<>
			<Typography variant="h3" marginTop={3}>
				Guardar Producto
			</Typography>
			<form onSubmit={onSubmit}>
				<TextField
					{...register('nombre')}
					id="standard-basic"
					label="Nombre del producto"
					variant="standard"
					fullWidth
					margin={'normal'}
				/>
				{errors?.nombre && (
					<p style={{ color: 'red' }}>{errors.nombre.message}</p>
				)}
				<Grid container xs={12} justifyContent={'space-between'}>
					<Grid item xs={5}>
						<TextField
							{...register('precio_unitario')}
							id="standard-basic"
							label="Precio del producto"
							variant="standard"
							margin={'normal'}
							fullWidth
						/>
					</Grid>
					<Grid item xs={5} marginTop={2}>
						<FormControl fullWidth variant="standard">
							<InputLabel id="demo-simple-select-label">Unidades</InputLabel>
							<Select
								{...register('unidad')}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="Unidades"
								defaultValue={''}
							>
								{unidades.map((unidad) => (
									<MenuItem key={unidad._id} value={unidad._id}>
										{unidad.tipo_unidad}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<FormControl fullWidth variant="standard">
					<InputLabel id="demo-simple-select-label">Categoría</InputLabel>
					<Select
						{...register('categoria')}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Categoría"
						defaultValue={''}
					>
						{categorias.map((categoria) => (
							<MenuItem key={categoria._id} value={categoria._id}>
								{categoria.tipo_categoria}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					{...register('cantidad_unidades')}
					id="standard-basic"
					label="Cantidad unidades"
					variant="standard"
					fullWidth
					margin={'normal'}
				/>
				<Button sx={{ marginTop: 3 }} type="submit" variant="contained">
					Guardar
				</Button>
			</form>
		</>
	)
}
