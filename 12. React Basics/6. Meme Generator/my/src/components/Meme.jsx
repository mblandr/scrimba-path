import './Meme.css'
import defUrl from './img/no-image.png'

export default function Meme({ imgUrl, first, second }) {

	return (

		<div className="img">
			<img src={imgUrl || defUrl} />
			<p className="first">{first}</p>
			<p className="second">{second}</p>
		</div>

	)
}