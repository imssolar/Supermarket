import React, { useReducer } from 'react'
import { Producto, ProductoSimple } from '../../interfaces/listado'
import { ProductosContext } from './ProductosContext'
import { productosReducer } from './productosReducer'
import api from '../../api/api'

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
	producto: ProductoSimple | null
}

const INITIAL_STATE: productosState = {
	productos: [],
	loading: false,
	carrito_compras: [],
	producto: null,
}

export const ProductosState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(productosReducer, INITIAL_STATE)

	const getProductos = async () => {
		const { data } = await api.get('/products')
		try {
			dispatch({
				type: 'GET_PRODUCTOS',
				payload: data.products,
			})
		} catch (error) {
			console.log(error)
		} finally {
			dispatch({
				type: 'HANDLE_LOADING',
			})
			console.log('terminó')
		}
	}

	const agregarProducto = async (producto: Producto) => {
		const { data } = await api.post('/products', producto)

		try {
			dispatch({
				type: 'ADD_PRODUCTO',
				payload: data.product,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const updateProducto = async (
		producto: ProductoSimple | Producto,
		id: string
	) => {
		const { data } = await api.put(`/products/${id}`, producto)
		try {
			dispatch({
				type: 'UPDATE_PRODUCTO',
				payload: { producto: data.product, id },
			})
		} catch (error) {
			console.log(error)
		}
	}

	const getProductoByID = async (id: string) => {
		const { data } = await api.get(`/products/${id}`)
		try {
			dispatch({
				type: 'FIND_PRODUCTO',
				payload: data.product,
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
				agregarProducto,
				updateProducto,
				getProductoByID,
			}}
		>
			{children}
		</ProductosContext.Provider>
	)
}
