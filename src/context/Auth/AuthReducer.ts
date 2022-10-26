import { Usuario } from '../../interfaces/usuarios'
import { AuthState } from './AuthState'

type AuthActionType =
	| {
			type: 'REGISTRAR'
			payload: { usuario: Usuario; token: string; mensaje: string }
	}
	| { type: 'INICIAR_SESION'; payload: { usuario: Usuario; token: string } }
	| { type: 'LOGOUT' }

export const AuthReducer = (
	state: AuthState,
	action: AuthActionType
): AuthState => {
	switch (action.type) {
	case 'REGISTRAR':
		return {
			...state,
			usuario: action.payload.usuario,
			token: action.payload.token,
			mensaje: action.payload.mensaje,
			status: 'AUTENTICADO',
		}

	case 'INICIAR_SESION':
		return {
			...state,
			usuario: action.payload.usuario,
			token: action.payload.token,
			status: 'AUTENTICADO',
		}

	case 'LOGOUT':
		return {
			...state,
			usuario: null,
			token: '',
			status: 'NO AUTENTICADO',
		}

	default:
		return state
	}
}
