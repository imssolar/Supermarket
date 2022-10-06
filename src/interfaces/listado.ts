export interface Productos {
	listado: Producto[]
}

export interface Producto {
	id: number
	nombre: string
	precio_unitario: number
	unidad: Unidad
	categoria: Categoria
	imagen?: string
	codigo_barra?: string
	cantidad_unidades: number
	estado?: Estado
	esta_en_carrito?: boolean
}

export interface Categoria {
	id_categoria: number
	tipo_categoria: string
}

export interface Unidad {
	id_unidad: number
	tipo_unidad: string
}

export type Estado = 'Activo' | 'Inactivo' | 'Suspendido'
