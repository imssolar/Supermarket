import React, { useReducer } from 'react'
import { Producto, ProductoSimple } from '../../interfaces/listado'
import { AuthContext } from './AuthContext'
import { AuthReducer } from './AuthReducer'
import data from '../../data/productos.json'
import api from '../../api/api'
import { Login, Status, Usuario } from '../../interfaces/usuarios'

interface stateProps {
	children: React.ReactNode
}

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

	const iniciarSesion = async (usuario: Login) => {
		const { data } = await api.post('/auth/login', usuario)
		try {
			dispatch({
				type: 'INICIAR_SESION',
				payload: {
					usuario: data.user,
					token: data.token,
				},
			})
			localStorage.setItem('token', data.token)
		} catch (error) {
			console.log(error)
		}
	}

	const cerrarSesion = () => {
		localStorage.removeItem('token')
		dispatch({
			type: 'LOGOUT',
		})
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				registrar,
				iniciarSesion,
				cerrarSesion,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
