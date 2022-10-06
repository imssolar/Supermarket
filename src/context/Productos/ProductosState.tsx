import React, { useReducer } from 'react'
import { Producto } from '../../interfaces/listado'
import { ProductosContext } from './ProductosContext'
import { productosReducer } from './productosReducer'
import data from '../../data/productos.json'

interface stateProps {
	children: React.ReactNode
}
/**
 * agregar acá
 *
 */
export interface productosState {
	productos: Producto[]
	loading: boolean
	carrito_compras: Producto[]
}

const INITIAL_STATE: productosState = {
	productos: [],
	loading: false,
	carrito_compras: [],
}

export const ProductosState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(productosReducer, INITIAL_STATE)

	const getProductos = () => {
		try {
			dispatch({
				type: 'GET_PRODUCTOS',
				payload: data.listado,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const agregarCarrito = (producto: Producto) => {
		try {
			dispatch({
				type: 'ADD_CARRITO',
				payload: producto,
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<ProductosContext.Provider
			value={{
				...state,
				getProductos,
				agregarCarrito,
			}}
		>
			{children}
		</ProductosContext.Provider>
	)
}
