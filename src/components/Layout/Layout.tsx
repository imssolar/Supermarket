import React from 'react'
import { Footer } from '../'

interface Props {
	children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
	return (
		<>
			{children}
			<Footer />
		</>
	)
}
