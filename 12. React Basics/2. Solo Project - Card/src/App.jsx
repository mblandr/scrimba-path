import Card from './components/Card'
import './App.css'
import photo from './img/photo.jpg'


export default function App() {

	return <div className="cnt">
		<Card name='Laura Smith' photo={photo} profession='Frontend Developer' web='laurasmith.website' email='mblandr@gmail.com' linkedin='#' aboutText='I am a frontend developer with a particular interest in making things simple and automating daily tasks. I try to keep up with security and best practices, and am always looking for new things to learn.' interestsText='Food expert. Music scholar. Reader. Internet fanatic. Bacon buff. Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.' />
	</div>
}
