import React, { useContext, useEffect, useMemo } from 'react'
import { Producto } from '../../interfaces/listado'
import { Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { MUIButton } from '../Button/MUIButton'
import { ProductosContext } from '../../context/Productos/ProductosContext'
import { CardProducto } from './CardProducto'
import { Input } from '../Input/Input'
import { Carrito } from '../Carrito/Carrito'

export const ListadoProductos = () => {
	const { getProductos, productos } = useContext(ProductosContext)

	useEffect(() => {
		getProductos()
	}, [])
	const cantidad = 15

	const productosByStatus = useMemo(
		() => productos.filter((p) => p.cantidad_unidades === cantidad),
		[productos]
	)
	console.log(productosByStatus)

	return (
		<Grid container spacing={2}>
			<Grid xs={4}>
				<h3>ASIDE</h3>
			</Grid>
			<Grid xs={4} sx={{ marginTop: 5 }}>
				<Typography variant="h3">Supermarket APP</Typography>
				<Input />
				{productos.map((producto: Producto) => (
					<CardProducto producto={producto} key={producto.id} />
				))}
				<Stack
					spacing={2}
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<MUIButton>Inicio</MUIButton>
					<MUIButton>Atrás</MUIButton>
					<MUIButton>Siguiente</MUIButton>
					<MUIButton>último</MUIButton>
				</Stack>
			</Grid>
			<Grid xs={4}>
				<Carrito />
			</Grid>
		</Grid>
	)
}
