import React from 'react'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

export const Progress = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress />
		</Box>
	)
}
