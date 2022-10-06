import React from 'react'
import { TextField } from '@mui/material'

export const Input = () => {
	return (
		<TextField
			sx={{ marginTop: 5 }}
			fullWidth
			size="small"
			placeholder="¿Qué estás buscando?"
		></TextField>
	)
}
