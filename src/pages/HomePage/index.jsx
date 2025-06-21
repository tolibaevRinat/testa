import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './HomePage.module.scss'

const HomePage = ({ user, handleLogout }) => {
	const navigate = useNavigate()

	useEffect(() => {
		user?.email ? navigate('/') : navigate('/auth')
	}, [navigate])

	return (
		<>
			<h1 className={styles.root}>HomePage</h1>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}

export default HomePage
