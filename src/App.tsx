import './App.css'
import { ProductosState } from './context/Productos/ProductosState'
import { Navbar } from './components'
export const App = () => {
	return (
		<div>
			<ProductosState>
				<Navbar />
			</ProductosState>
		</div>
	)
}
