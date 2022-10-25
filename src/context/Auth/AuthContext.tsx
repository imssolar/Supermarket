import { createContext } from 'react'
import { Status, Usuario } from '../../interfaces/usuarios'

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
}

export const AuthContext = createContext({} as ContextProps)
