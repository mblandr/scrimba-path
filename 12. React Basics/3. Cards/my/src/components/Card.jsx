import './Card.css'
import Image from './Image'
export default function Card({ className, img, title, phone, email }) {
	const classes = ['card']
	className && classes.push(className)
	const classNames = classes.join(' ')
	return <article className={classNames}>
		<Image src={`/img/${img ?? title.toLowerCase()}.png`} alt={title} className="image" />
		<div className="content">
			<h2>{title}</h2>
			<a className="phone" href={`tel:${phone}`}>{phone}</a>
			<a className="email" href={`mailto:${email}`}>{email}</a>
		</div>
	</article>
}