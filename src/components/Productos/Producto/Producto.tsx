import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ProductosContext } from '../../../context/Productos/ProductosContext'
import { EditarProducto } from '../EditarProducto/EditarProducto'

interface Props {
	id: string
}

export const Producto = ({ id }: Props) => {
	const { producto, getProductoByID } = useContext(ProductosContext)
	const [isEditar, setIsEditar] = useState<boolean>(false)

	useEffect(() => {
		getProductoByID(id)
	}, [id])

	return (
		<>
			{isEditar ? (
				<EditarProducto id={id} />
			) : (
				<div>
					<h3>{producto?.nombre}</h3>
					<p>{producto?.precio_unitario}</p>
					<p>{producto?.total}</p>
					<Button onClick={() => setIsEditar(!isEditar)}>Editar</Button>
				</div>
			)}
		</>
	)
}
