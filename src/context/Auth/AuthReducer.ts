import { Usuario } from '../../interfaces/usuarios'
import { AuthState } from './AuthState'

type AuthActionType = {
	type: 'REGISTRAR'
	payload: { usuario: Usuario, token: string,mensaje:string }
}

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
			mensaje:action.payload.mensaje
		}

	default:
		return state
	}
}
