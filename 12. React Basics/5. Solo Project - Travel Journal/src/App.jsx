import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import data from '../data.js'

export default function App() {
	return <>
		<Header className='h-main'>
			my travel journal.
		</Header>
		<div className="cnt">
			<main>
				{
					data.map(
						item => <Card className='article' key={item.id} {...item} />
					)
				}
			</main>

		</div>
	</>
}
