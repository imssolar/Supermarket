import React, { useContext } from 'react'
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { ProductosContext } from '../../../context/Productos/ProductosContext'
import { useForm } from 'react-hook-form'
import { Categoria, Producto, Unidad } from '../../../interfaces/listado'
import { useNavigate } from 'react-router-dom'

interface Props {
	id: string
}

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
	unidad: string
	categoria: string
	codigo_barra: string
	total: number
	cantidad_unidades: number
	esta_en_carrito: false
	imagen: string
}

export const EditarProducto = ({ id }: Props) => {
	const { updateProducto, producto } = useContext(ProductosContext)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>() //{ resolver }
	const onSubmit = handleSubmit((data) => {
		console.log(data)
		data.total = data.precio_unitario * data.cantidad_unidades
		data.esta_en_carrito = false
		// data._id = id
		updateProducto(data, id)
		navigate('/')
	})

	const navigate = useNavigate()

	return (
		<>
			<Typography variant="h3" marginTop={3}>
				Editar Producto
			</Typography>
			<form onSubmit={onSubmit}>
				<TextField
					{...register('nombre')}
					id="standard-basic"
					label="Nombre del producto"
					variant="standard"
					fullWidth
					margin={'normal'}
					defaultValue={producto?.nombre}
				/>
				<Grid container xs={12} justifyContent={'space-between'}>
					<Grid item xs={5}>
						<TextField
							{...register('precio_unitario')}
							id="standard-basic"
							label="Precio del producto"
							variant="standard"
							margin={'normal'}
							fullWidth
							defaultValue={producto?.precio_unitario}
							type="number"
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
								defaultValue={producto?.unidad}
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
						defaultValue={producto?.categoria}
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
					defaultValue={producto?.cantidad_unidades}
				/>
				<Button sx={{ marginTop: 3 }} type="submit" variant="contained">
					Guardar
				</Button>
			</form>
		</>
	)
}
