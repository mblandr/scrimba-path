import Image from './Image'
import Button from './Button'
import Icon from './Icon'
import Paragraph from './Paragraph'
import emailImg from '../img/email.svg'
import linkedinImg from '../img/linkedin.svg'

import './Card.css'

export default function Card({
	name, photo, profession, web, email, linkedin, aboutText, interestsText,
}) {
	return <article className="card">
		<Image src={photo} alt='my photo' />
		<header>
			<h1>{name}</h1>
			<p className="prof">{profession}</p>
			<a href={`https://${web}`} target="_blank" className='web'>{web}</a>

		</header>
		<div className="body">
			<div className="btns">
				<Button imgUrl={emailImg} href={`mailto: ${email}`} text='email' color='#000' backgroundColor='#fff' cssClass='button' />
				<Button imgUrl={linkedinImg} href='#' text='linkedin' color='#fff' backgroundColor='#5093E2' cssClass='button' />
			</div>
			<Paragraph cssClass='paragraph' header='about' content={aboutText} />
			<Paragraph cssClass='paragraph' header='interests' content={interestsText} />

		</div>
		<footer>
			<Icon type='twitter' cssClass='icon' link='#' />
			<Icon type='facebook' cssClass='icon' link='#' />
			<Icon type='instagram' cssClass='icon' link='#' />
			<Icon type='github' cssClass='icon' link='#' />
		</footer>
	</article>
}