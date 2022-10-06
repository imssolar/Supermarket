import React from 'react'
import Button from '@mui/material/Button'

interface Props {
	children: React.ReactNode
}

export const MUIButton = ({ children }: Props) => {
	return (
		<Button variant="contained" size="medium" color="success">
			{children}
		</Button>
	)
}
