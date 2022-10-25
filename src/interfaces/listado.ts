export interface Productos {
	listado: Producto[]
}

export interface Producto {
	_id: string
	nombre: string
	precio_unitario: number
	unidad: Unidad
	categoria: Categoria
	imagen?: string
	codigo_barra?: string
	cantidad_unidades: number
	estado?: Estado
	esta_en_carrito: boolean
}

export interface Categoria {
	_id: string
	tipo_categoria: string
}

export interface Unidad {
	_id: string
	tipo_unidad: string
}

export interface ProductoSimple {
	_id?:string
    nombre:            string;
    precio_unitario:   number;
    imagen:            string;
    codigo_barra:      string;
    cantidad_unidades: number;
    total:             number;
    esta_en_carrito:   boolean;
    categoria:         string;
    unidad:            string;
}




export type Estado = 'Activo' | 'Inactivo' | 'Suspendido'
