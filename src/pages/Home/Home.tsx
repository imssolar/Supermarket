import React, { useContext, useEffect, useState } from 'react'
import { Grid, Typography, Stack, Button, Paper } from '@mui/material'
import { Input, Layout, ListadoProductos, MUIButton } from '../../components'
import { AddCircleOutline as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ProductosContext } from '../../context/Productos/ProductosContext'
import { Login } from '../Usuarios/IniciarSesion/Login'
import { Registro } from '../Usuarios/Registro'

export const Home = () => {
	const navigate = useNavigate()
	const [largoCarrito, setLargoCarrito] = useState<number>(0)
	const [totalCarrito, setTotalCarrito] = useState<number>(0)

	const { productos } = useContext(ProductosContext)

	useEffect(() => {
		const num = productos.filter((p) => p.esta_en_carrito).length
		if (num > 0) {
			setLargoCarrito(num)
		} else {
			setLargoCarrito(0)
		}
	}, [productos])

	useEffect(() => {
		const arrayDeTotales = productos
			.filter((p) => p.esta_en_carrito)
			.map((p) => p.cantidad_unidades * p.precio_unitario)
		if (arrayDeTotales.length > 0) {
			const sumaTotal = arrayDeTotales.reduce((prev, next) => prev + next)
			setTotalCarrito(sumaTotal)
		}
	}, [productos])

	/**CREAR SPINNER CUANDO CARGUE PRODUCTOS
	 *
	 * 1-¿Cuándo haces un get a un endpoint seguro(consulta que tiene una key para evitar que cualquiera consulte), que header tienes que pasarle?
	 * Sería pasarle la key authorization con el value token
	 *
	 * 2.-Hacer un post al endpoint con los datos email y password. Si está todo ok, devolverá user y token.Guardar en el context
	 *
	 */

	return (
		<Layout>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<h3>ASIDE</h3>
				</Grid>
				<Grid item xs={4} sx={{ marginTop: 5 }}>
					<Typography variant="h3">Supermarket APP</Typography>
					<Button variant="outlined" onClick={() => navigate('/producto')}>
						<AddIcon />
					</Button>
					<Input />

					<ListadoProductos estado={false} />
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
				<Grid item xs={4} sx={{ marginTop: 5 }}>
					{largoCarrito > 0 ? (
						<Typography variant="h3">
							Carrito de Compras({largoCarrito})
						</Typography>
					) : (
						<Typography variant="h3">Carrito sin productos</Typography>
					)}

					<ListadoProductos estado={true} />
					{largoCarrito > 0 ? (
						<Paper
							elevation={6}
							sx={{ width: '250px', height: '50px', textAlign: 'center' }}
						>
							Total a pagar:${totalCarrito}
						</Paper>
					) : null}
				</Grid>
			</Grid>
		</Layout>
	)
}
