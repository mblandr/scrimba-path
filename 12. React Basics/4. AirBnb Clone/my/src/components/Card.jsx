import './Card.css'
export default function Card({
	title, price, coverImg, stats: { rating, reviewCount }, location, openSpots, className
}) {
	const classes = ['card']
	className && classes.push(className)
	const classNames = classes.join(' ')
	let balge
	if (openSpots === 0)
		balge = 'sold out'
	else if (location.toLowerCase() === 'online')
		balge = 'online'

	return <article className={classNames}>
		<div className="img">
			{balge && <p className="balge">{balge}</p>}
			<img src={`/img/cards/${coverImg}`} alt={title} />
		</div>
		<p className="stat">
			<img src="/img/star.svg" />
			<span>{rating}</span>
			({reviewCount})·USA
		</p>
		<p className="title">{title}</p>
		<p className="price"><span>From ${price} / </span> person</p>
	</article>
}