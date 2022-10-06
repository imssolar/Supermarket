import React, { ChangeEvent } from 'react'
import { Producto } from '../../interfaces/listado'
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Checkbox,
} from '@mui/material'

interface Props {
	producto: Producto
}

export const CardProducto = ({ producto }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e)
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
						{producto.nombre}
					</Typography>
				</CardContent>
				<CardActions>
					<Checkbox onChange={handleChange} />
				</CardActions>
			</Card>
		</>
	)
}
