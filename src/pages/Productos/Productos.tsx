import React, { useContext } from 'react'
import { Button, Grid } from '@mui/material'

import { useNavigate, useParams } from 'react-router-dom'
import { CrearProducto, EditarProducto } from '../../components/Productos'
import { Layout } from '../../components'
import { Producto } from '../../components/Productos/Producto/Producto'

export const Productos = () => {
	const navigate = useNavigate()
	const { id } = useParams()

	return (
		<Layout>
			<Grid container justifyContent={'center'} sx={{ minHeight: '90vh' }}>
				<Grid item xs={6}>
					<Button onClick={() => navigate('/')}>Volver</Button>

					{id ? <Producto id={id} /> : <CrearProducto />}
				</Grid>
			</Grid>
		</Layout>
	)
}
