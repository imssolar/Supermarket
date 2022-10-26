import React, { useState, MouseEvent, useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import {
	BrowserRouter,
	Link,
	NavLink,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom'
import { Home } from '../../pages'
import { Productos } from '../../pages/Productos/Productos'
import { Login } from '../../pages/Usuarios/IniciarSesion'
import { Registro } from '../../pages/Usuarios/Registro'
import { AuthContext } from '../../context/Auth/AuthContext'
import { rgbToHex } from '@mui/material'
import { color } from '@mui/system'

const pages = ['home', 'crear-producto']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const { cerrarSesion, usuario } = useContext(AuthContext)

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	/*navigate a login*/
	const logout = () => {
		cerrarSesion()
		setAnchorElUser(null)
	}

	const avatarBGColor = () => {
		const colorR = Math.floor(Math.random() * 256)
		const colorG = Math.floor(Math.random() * 256)
		const colorB = Math.floor(Math.random() * 256)
		const hex = `#${colorR.toString(16)}${colorG.toString(16)}${colorB.toString(
			16
		)}`
		return hex
	}

	useEffect(() => {
		avatarBGColor()
	}, [])

	return (
		<BrowserRouter>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/home"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							LOGO
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									// <MenuItem key={page} onClick={handleCloseNavMenu}>
									<NavLink key={page} to={'home'}>
										{page}
									</NavLink>
									// </MenuItem>
								))}
							</Menu>
						</Box>
						<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							href=""
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							LOGO
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										sx={{ bgcolor: avatarBGColor() }}
										src="/static/images/avatar/2.jpg"
									>
										{`${usuario?.nombre.split('')[0]}${
											usuario?.apellido.split('')[0]
										}`}
									</Avatar>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{settings[0]}</Typography>
								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{settings[1]}</Typography>
								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{settings[2]}</Typography>
								</MenuItem>
								<MenuItem>
									<Link onClick={logout} to={'/login'}>
										<Typography textAlign="center">{settings[3]}</Typography>
									</Link>
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/producto" element={<Productos />} />
				<Route path="/producto/:id" element={<Productos />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registro" element={<Registro />} />
			</Routes>
		</BrowserRouter>
	)
}
