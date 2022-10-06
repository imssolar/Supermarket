import { createContext } from 'react'
import { Producto } from '../../interfaces/listado'

/**
 * agregarlo en la interface
 *
 */
interface contextProps {
	productos: Producto[]
	loading: boolean
	carrito_compras: Producto[]
	getProductos: () => void
	agregarCarrito: (producto: Producto) => void
}

export const ProductosContext = createContext({} as contextProps)
