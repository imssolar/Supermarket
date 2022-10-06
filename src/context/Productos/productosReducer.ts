import { Producto } from '../../interfaces/listado'
import { productosState } from './ProductosState'

/**
 *
 */
type ProductosActionType =
	| { type: 'GET_PRODUCTOS'; payload: Producto[] }
	| { type: 'ADD_CARRITO'; payload: Producto }

export const productosReducer = (
	state: productosState,
	action: ProductosActionType
): productosState => {
	switch (action.type) {
	case 'GET_PRODUCTOS':
		return {
			...state,
			productos: action.payload,
		}
	case 'ADD_CARRITO':
		return {
			...state,
			carrito_compras: [...state.carrito_compras, action.payload],
		}
	default:
		return state
	}
}
