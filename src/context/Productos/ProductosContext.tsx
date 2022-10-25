import { createContext } from 'react'
import { Producto, ProductoSimple } from '../../interfaces/listado'

/**
 * agregarlo en la interface
 *
 */
interface contextProps {
	productos: Producto[]
	producto: ProductoSimple | null
	loading: boolean
	carrito_compras: Producto[]
	getProductos: () => Promise<void>
	agregarProducto: (producto: Producto) => void
	updateProducto: (producto: ProductoSimple | Producto, id: string) => void
	getProductoByID: (id: string) => void
}

export const ProductosContext = createContext({} as contextProps)
