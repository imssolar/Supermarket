import React, { useReducer } from 'react'
import { Producto, ProductoSimple } from '../../interfaces/listado'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import data from '../../data/productos.json'
import api from '../../api/api'
import { Status, Usuario } from '../../interfaces/usuarios'

interface stateProps {
	children: React.ReactNode
}
/**
 * agregar acá
 *
 */
export interface AuthState {
	token: string
	usuario: Usuario | null
	status: Status
	mensaje: string
}

const INITIAL_STATE: AuthState = {
	token: '',
	usuario: null,
	status: 'VERIFICANDO',
	mensaje: '',
}

export const AuthState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

	const registrar = async (usuario: Usuario) => {
		const { data } = await api.post('/users', usuario)

		try {
			dispatch({
				type: 'REGISTRAR',
				payload: {
					usuario: data.user,
					token: data.token,
					mensaje: data.msg,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				registrar,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
