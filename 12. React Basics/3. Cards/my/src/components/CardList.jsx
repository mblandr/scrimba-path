import './CardList.css'
import Card from './Card'

export default function CardList({ cards = [] }) {
	return <section className="items">
		{cards.map(({ title, ...props }) => <Card className='item' key={title} title={title} {...props} />)}
	</section>
}