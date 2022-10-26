import React, { useReducer, useEffect } from 'react'
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

	useEffect(() => {
		getToken()
	}, [])

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
	const getToken = async () => {
		/*
		1.Almacenar  tenemos token en localStorage
		2.Si no hay token, return dispatch no autenticoado = logout
		3.En caso de que haya token, hacemos un get con el header x-token
		4.Si no es ok, logout
		5.Seteamos el token denuevo en el localStorage y ejecutamos el iniciarSesion
		*/
		const token = localStorage.getItem('token')
		if (!token) return dispatch({ type: 'LOGOUT' })
		const respuesta = await api.get('/auth', { headers: { 'x-token': token } })
		if (respuesta.status !== 200) return dispatch({ type: 'LOGOUT' })
		localStorage.setItem('token', token)
		dispatch({
			type: 'INICIAR_SESION',
			payload: {
				usuario: respuesta.data.user,
				token: respuesta.data.token,
			},
		})
	}

	return (
		<AuthContext.Provider
			value={{
				...state,
				registrar,
				iniciarSesion,
				cerrarSesion,
				getToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
