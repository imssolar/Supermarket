import React from 'react'
import './App.css'
import { ProductosState } from './context/Productos/ProductosState'
import { Navbar } from './components'
import { AuthContext } from './context/Auth/AuthContext'
import { AuthState } from './context/Auth/AuthState'
export const App = () => {
	return (
		<div>
			<AuthState>
				<ProductosState>
					<Navbar />
				</ProductosState>
			</AuthState>
		</div>
	)
}
