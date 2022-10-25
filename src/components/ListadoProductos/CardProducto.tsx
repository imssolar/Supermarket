import React, { ChangeEvent, useContext, useState } from 'react'
import { Producto, ProductoSimple } from '../../interfaces/listado'
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Checkbox,
} from '@mui/material'
import { ProductosContext } from '../../context/Productos/ProductosContext'
import { Link } from 'react-router-dom'

interface Props {
	producto: Producto
	isCarrito: boolean
}

export const CardProducto = ({ producto, isCarrito }: Props) => {
	const [isChecked, setChecked] = useState(isCarrito)

	const { updateProducto } = useContext(ProductosContext)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
		producto.esta_en_carrito = e.target.checked
		updateProducto(producto, producto._id)
	}

	return (
		<>
			<Card
				sx={{
					marginTop: 5,
					marginBottom: 5,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<CardContent>
					<Typography sx={{ fontSize: 16, textTransform: 'uppercase' }}>
						{isCarrito ? (
							<del>{producto.nombre}</del>
						) : (
							<Link to={`/producto/${producto._id}`}>{producto.nombre}</Link>
						)}
					</Typography>
				</CardContent>
				<CardActions>
					<Checkbox onChange={handleChange} checked={isChecked} />
				</CardActions>
			</Card>
		</>
	)
}
