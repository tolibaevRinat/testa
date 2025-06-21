import { useState, useEffect } from 'react'
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import Popup from './components/Popup'

function App() {
	const navigate = useNavigate()

	const [isLogin, setIsLogin] = useState(true)
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState(null)

	const [isPopupOpen, setIsPopupOpen] = useState(false)

	const [popupTitle, setPopupTitle] = useState(
		"Siz muvaffaqiyatli ro'yxatdan o'tdingiz"
	)
	const [popupText, setPopupText] = useState(
		'Iltimos akkauntingizga kiring'
	)

	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
	})

	const [registerData, setRegisterData] = useState({
		username: '',
		email: '',
		password: '',
	})

	useEffect(() => {
		checkAuth()
	}, [])

	const handleOpenPopup = () => {
		setIsPopupOpen(true)
	}

	const handleClosePopup = () => {
		setIsPopupOpen(false)
	}

	const checkAuth = async () => {
		const token = localStorage.getItem('token')
		if (token) {
			try {
				const response = await fetch(
					'https://kiymeshek.uz/test-zakaz/profile',
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					}
				)

				if (response.ok) {
					const data = await response.json()
					if (data.success) {
						setUser(data.user)
					}
				}
			} catch (error) {
				console.error('Auth check failed:', error)
				localStorage.removeItem('token')
			}
		}
	}

	const handleLogin = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch(
				'https://kiymeshek.uz/test-zakaz/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				}
			)

			const data = await response.json()

			if (data.success) {
				localStorage.setItem('token', data.token)
				setUser(data.user)
			} else {
				alert(data.message || 'Login failed')
			}
		} catch (error) {
			console.error('Login error:', error)
			alert('Network error occurred')
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch(
				'https://kiymeshek.uz/test-zakaz/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(registerData),
				}
			)

			const data = await response.json()

			if (data.success) {
				// alert('Registration successful! Please login.')
				setPopupTitle(
					"Siz muvaffaqiyatli ro'yxatdan o'tdingiz"
				)
				setPopupText('Iltimos akkauntingizga kiring')
				handleOpenPopup()
				setIsLogin(true)
				setRegisterData({
					username: '',
					email: '',
					password: '',
				})
			} else {
				alert(data.message || 'Registration failed')
			}
		} catch (error) {
			console.error('Register error:', error)
			// alert('Network error occurred')
			setPopupTitle('Roʻyxatdan oʻtishda xatolik yuz berdi')
			setPopupText('Iltimos, keyinroq urinib koʻring')
		} finally {
			setLoading(false)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		setUser(null)
		setLoginData({ username: '', password: '' })
		setRegisterData({
			username: '',
			email: '',
			password: '',
		})
		navigate('/auth')
	}

	return (
		<>
			<Popup
				title={popupTitle}
				text={popupText}
				isOpen={isPopupOpen}
				onClose={handleClosePopup}
			/>
			<Header />
			<main className='page'>
				<Routes>
					<Route
						path='/'
						element={
							<HomePage
								user={user}
								handleLogout={handleLogout}
							/>
						}
					/>
					<Route
						path='/auth'
						element={
							<AuthPage
								user={user}
								isLogin={isLogin}
								loginData={loginData}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								loading={loading}
								handleLogin={handleLogin}
								handleRegister={handleRegister}
								setLoginData={setLoginData}
								setIsLogin={setIsLogin}
								registerData={registerData}
								setRegisterData={setRegisterData}
							/>
						}
					/>
				</Routes>
			</main>
			<Footer />
		</>
	)
}

export default App
