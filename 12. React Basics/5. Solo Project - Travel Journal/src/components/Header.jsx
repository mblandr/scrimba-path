import logo from './img/logo.svg'
import './Header.css'

export default function Header({ className, children }) {
	const classes = ['header-main']
	className && classes.push(className)
	const classNames = classes.join(' ')
	return <header className={classNames}>
		<img src={logo} alt="logo" />
		<h1>{children}</h1>
	</header>

}