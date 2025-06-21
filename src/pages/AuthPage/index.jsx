import { useNavigate } from 'react-router-dom'
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Lock,
	ArrowRight,
} from 'lucide-react'

import styles from './AuthPage.module.scss'
import { useEffect } from 'react'

const AuthPage = ({
	user,
	isLogin,
	loginData,
	showPassword,
	setShowPassword,
	loading,
	handleLogin,
	handleRegister,
	setLoginData,
	setIsLogin,
	registerData,
	setRegisterData,
}) => {
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/')
			return
		}
	}, [user])

	return (
		<div className={styles.container}>
			<div className={styles.authCard}>
				<div className={styles.header}>
					<h1>Kiymeshek</h1>
					<p>Welcome to your fashion destination</p>
				</div>

				<div className={styles.toggleContainer}>
					<div className={styles.toggle}>
						<button
							className={`${styles.toggleBtn} ${
								isLogin ? styles.active : ''
							}`}
							onClick={() => setIsLogin(true)}
						>
							Login
						</button>
						<button
							className={`${styles.toggleBtn} ${
								!isLogin ? styles.active : ''
							}`}
							onClick={() => setIsLogin(false)}
						>
							Register
						</button>
						<div
							className={`${styles.slider} ${
								isLogin ? styles.left : styles.right
							}`}
						/>
					</div>
				</div>

				{isLogin ? (
					<div className={styles.form}>
						<div className={styles.inputGroup}>
							<div className={styles.inputContainer}>
								<User className={styles.icon} size={20} />
								<input
									type='text'
									placeholder='Username'
									value={loginData.username}
									onChange={e =>
										setLoginData({
											...loginData,
											username: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<div className={styles.inputContainer}>
								<Lock className={styles.icon} size={20} />
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
									value={loginData.password}
									onChange={e =>
										setLoginData({
											...loginData,
											password: e.target.value,
										})
									}
									required
								/>
								<button
									type='button'
									className={styles.eyeBtn}
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
						</div>

						<button
							className={styles.submitBtn}
							disabled={loading}
							onClick={handleLogin}
						>
							{loading ? (
								<div className={styles.spinner} />
							) : (
								<>
									Login
									<ArrowRight size={20} />
								</>
							)}
						</button>
					</div>
				) : (
					<div className={styles.form}>
						<div className={styles.inputGroup}>
							<div className={styles.inputContainer}>
								<User className={styles.icon} size={20} />
								<input
									type='text'
									placeholder='Username'
									value={registerData.username}
									onChange={e =>
										setRegisterData({
											...registerData,
											username: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<div className={styles.inputContainer}>
								<Mail className={styles.icon} size={20} />
								<input
									type='email'
									placeholder='Email'
									value={registerData.email}
									onChange={e =>
										setRegisterData({
											...registerData,
											email: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>

						<div className={styles.inputGroup}>
							<div className={styles.inputContainer}>
								<Lock className={styles.icon} size={20} />
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
									value={registerData.password}
									onChange={e =>
										setRegisterData({
											...registerData,
											password: e.target.value,
										})
									}
									required
								/>
								<button
									type='button'
									className={styles.eyeBtn}
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<EyeOff size={20} />
									) : (
										<Eye size={20} />
									)}
								</button>
							</div>
						</div>

						<button
							className={styles.submitBtn}
							disabled={loading}
							onClick={handleRegister}
						>
							{loading ? (
								<div className={styles.spinner} />
							) : (
								<>
									Register
									<ArrowRight size={20} />
								</>
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default AuthPage
