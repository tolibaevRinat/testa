import { Circles } from 'react-loader-spinner'

import styles from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={styles.root}>
			<Circles
				height='80'
				width='80'
				color='#4fa94d'
				ariaLabel='circles-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
		</div>
	)
}

export default Loader
