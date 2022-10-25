export interface Usuario {
	nombre: string
	apellido: string
	email: string
	password: string
}

export interface Login {
	email: string
	password: string
}

export type Status= 'AUTENTICADO' | 'NO AUTENTICADO' | 'VERIFICANDO'