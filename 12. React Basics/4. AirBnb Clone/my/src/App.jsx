import './App.css'
import data from '../data.js'
import Promo from './components/Promo'
import Header from './components/Header'
import Card from './components/Card'
export default function App() {
	return <div className="cnt">
		<Header className='h-main' />
		<Promo count={9} className='promo' />
		<section className="content">
			<h1>Online Experiences</h1>
			<p>Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
			</p>
		</section>
		<section className="items">
			{data.map(
				item => <Card className='card-item' key={item.id} {...item} />
			)}
		</section>
	</div>

}