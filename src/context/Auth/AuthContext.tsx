import { createContext } from 'react'
import { Login, Status, Usuario } from '../../interfaces/usuarios'

/**
 * agregarlo en la interface
 *
 */
interface ContextProps {
	token: string
	usuario: Usuario | null
	status: Status
	mensaje: string
	registrar: (usuario: Usuario) => Promise<void>
	iniciarSesion: (usuario: Login) => Promise<void>
	cerrarSesion: () => void
}

export const AuthContext = createContext({} as ContextProps)
