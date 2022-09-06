import './Promo.css'
export default function Promo({ count = 9, className }) {
	const items = [],
		classes = ['promo-items']
	className && classes.push(className)
	const classNames = classes.join(' ')

	for (let i = 1; i <= count; i++)
		items.push(
			<div className={`img img-${i}`}>
				<img src={`/img/promo/${i}.png`} />
			</div>
		)
	return <section className={classNames}>
		{items}
	</section>

}
