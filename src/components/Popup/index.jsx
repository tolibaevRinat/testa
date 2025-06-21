import React, { useState, useEffect } from 'react'
import styles from './Popup.module.scss'

const Popup = ({ isOpen, onClose, title, text }) => {
	const [isClosing, setIsClosing] = useState(false)

	useEffect(() => {
		// Добавляем/удаляем класс для body, чтобы предотвратить прокрутку фона
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
		// Очистка при размонтировании компонента
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	const handleClose = () => {
		setIsClosing(true)
		// Длительность анимации должна совпадать с transition-duration в SCSS
		setTimeout(() => {
			onClose() // Вызываем колбэк закрытия от родителя
			setIsClosing(false) // Сбрасываем состояние для следующего открытия
		}, 300) // 0.3s
	}

	// Если модальное окно не должно быть открыто и не находится в процессе закрытия, не рендерим его
	if (!isOpen && !isClosing) {
		return null
	}

	// Динамические классы для анимации
	// Если isOpen=true и isClosing=false -> 'open'
	// Если isClosing=true -> 'closing'
	// Иначе (isOpen=false и isClosing=false, обработано выше) -> ''
	const overlayAnimationClass =
		isOpen && !isClosing
			? styles.open
			: isClosing
			? styles.closing
			: ''
	const contentAnimationClass =
		isOpen && !isClosing
			? styles.open
			: isClosing
			? styles.closing
			: ''

	return (
		<div
			className={`${styles.popupOverlay} ${overlayAnimationClass}`}
			onClick={handleClose} // Закрытие по клику на оверлей
		>
			<div
				className={`${styles.popupContent} ${contentAnimationClass}`}
				onClick={e => e.stopPropagation()} // Предотвращаем закрытие по клику на контент
			>
				<div className={styles.popupHeader}>
					<h2>{title}</h2>
				</div>
				<p className={styles.popupBody}>{text}</p>
				<div className={styles.popupFooter}>
					<button
						className={styles.popupButton}
						onClick={handleClose}
					>
						Ок
					</button>
				</div>
			</div>
		</div>
	)
}

export default Popup
