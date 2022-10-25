import React, { useContext, useEffect, useMemo } from 'react'
import { Producto } from '../../interfaces/listado'
import { ProductosContext } from '../../context/Productos/ProductosContext'
import { CardProducto } from './CardProducto'

interface PropsListadoProductos {
	estado: boolean
}

export const ListadoProductos = ({ estado }: PropsListadoProductos) => {
	const { getProductos, productos } = useContext(ProductosContext)

	useEffect(() => {
		if (productos.length === 0) {
			console.log(productos.length)
			getProductos()
		}
	}, [productos])

	/*REVISAR que llega o que tiene productos cuando actualizamos uno*/
	const productosByStatus = useMemo(
		() => productos.filter((p) => p.esta_en_carrito === estado),
		[productos]
	)

	return (
		<div>
			{productosByStatus.map((producto: Producto) => (
				<CardProducto
					producto={producto}
					key={producto._id}
					isCarrito={producto.esta_en_carrito}
				/>
			))}
		</div>
	)
}
