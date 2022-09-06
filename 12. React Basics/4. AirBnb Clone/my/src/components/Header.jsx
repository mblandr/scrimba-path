import './Header.css'

export default function Header({ className }) {
	const classes = ['header-main']
	className && classes.push(className)
	const classNames = classes.join(' ')

	return <header className={classNames}>
		<img src="/img/logo.svg" alt="logo" />
	</header>

}