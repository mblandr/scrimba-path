import './Icon.css'
import facebook from './img/facebook.svg'
import twitter from './img/twitter.svg'
import instagram from './img/instagram.svg'
import github from './img/github.svg'
const icons = {
	facebook, twitter, instagram, github
}

export default function Icon({ type, cssClass, link }) {
	return <a href={link} className={`icon ${cssClass}`}>
		<img src={icons[type]} />
	</a>
}