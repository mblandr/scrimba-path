
import './Card.css'
export default function Card({ className, img, country, coords: [latitude, longitude], title, dates: { start, end }, description }) {
	const classes = ['card']
	className && classes.push(className)
	const classNames = classes.join(' ')
	return <article className={classNames}>
		<div className="img">
			<img src={`https://source.unsplash.com/${img}`} />
		</div>
		<div className="content">
			<p className="location">{country} <a target='_blank' nofollow noreferrer href={`http://www.google.com/maps/place/${latitude},${longitude}`}>View on Google Maps</a></p>
			<h2>{title}</h2>
			<p className="dates">{start.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {end.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
			<p className="descr">{description}</p>
		</div>
	</article>
}