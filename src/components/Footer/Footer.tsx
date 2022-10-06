import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import {
	SiReact,
	SiTypescript,
	SiReactrouter,
	SiMaterialui,
	SiGithub,
	SiLinkedin,
} from 'react-icons/si'

export const Footer = () => {
	return (
		<Box sx={{ width: 'auto', height: 'auto', backgroundColor: '#2C3E50' }}>
			<Grid container spacing={5} sx={{ marginTop: 5, marginLeft: 5 }}>
				<Grid xs={8}>
					<Typography
						sx={{ marginBottom: 3, fontWeight: 'bold', color: '#ECF0F1 ' }}
					>
						Proyecto realizado con
					</Typography>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
						<SiReact style={{ fontSize: '40', color: '#4AD5FF' }} />
						<SiTypescript
							style={{
								fontSize: '40',
								color: '#2F72BC',
							}}
						/>
						<SiReactrouter style={{ fontSize: '40', color: '#C5021A' }} />
						<SiMaterialui style={{ fontSize: '40', color: '#0079F2' }} />
					</Stack>
				</Grid>
				<Grid xs={4}>
					<Typography
						sx={{ marginBottom: 3, fontWeight: 'bold', color: '#ECF0F1 ' }}
					>
						Desarrollado por Iván Montecinos - 2022
					</Typography>
					<Stack direction={{ xs: 'row' }} spacing={5}>
						<SiGithub
							style={{ fontSize: '40', color: '#000000', cursor: 'pointer' }}
						/>
						<SiLinkedin
							style={{
								fontSize: '40',
								color: '#0073B0',
								cursor: 'pointer',
							}}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	)
}
