import './Button.css'
export default function Button({ imgUrl, text, cssClass, color, backgroundColor, href }) {
	return href
		?
		<a href={href} className={`btn ${cssClass}`} style={{ color, backgroundColor }}>
			<img src={imgUrl} />
			<span>{text}</span>
		</a>
		:
		<button className={`btn ${cssClass}`} style={{ color, backgroundColor }}>
			<img src={imgUrl} />
			<span>text</span>
		</button>
}
