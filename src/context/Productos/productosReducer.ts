import { Producto, ProductoSimple } from '../../interfaces/listado'
import { productosState } from './ProductosState'

type ProductosActionType =
	| { type: 'GET_PRODUCTOS'; payload: Producto[] }
	| { type: 'ADD_PRODUCTO'; payload: Producto }
	| { type: 'UPDATE_PRODUCTO'; payload: {producto: Producto,id:string} }
	| { type: 'FIND_PRODUCTO'; payload: ProductoSimple  }

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
	case 'ADD_PRODUCTO':
		return {
			...state,
			productos: [...state.productos, action.payload],
		}
	case 'UPDATE_PRODUCTO':
		return {
			...state,
			productos: state.productos.map(p => p._id === action.payload.id ? action.payload.producto : p)
				
		}

	case 'FIND_PRODUCTO':
		return {
			...state,
			producto: action.payload
		}

	default:
		return state
	}
}
