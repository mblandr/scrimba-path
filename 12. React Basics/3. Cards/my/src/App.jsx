import './App.css'
import CardList from './components/CardList'

const cards = [
	{
		title: 'Mr. Whiskerson sadfasdfasfd sdf asdf as df',
		img: 'mr-whiskerson',
		phone: '(212) 555-1234',
		email: 'mr.whiskaz@catnap.meow'
	},
	{
		title: 'Fluffykins',
		phone: '(212) 555-2345',
		email: 'fluff@me.com'
	},
	{
		title: 'Felix',
		phone: '(212) 555-4567',
		email: 'thecat@hotmail.com'
	},
	{
		title: 'Pumpkin',
		phone: '(0800) CAT KING',
		email: 'pumpkin@scrimba.com'
	},
]
export default function App() {
	return <div className="cnt">
		<CardList cards={cards} />
	</div>
}