import './Image.css'

export default function Image({ src, alt, cssClass }) {
	return <div className={`img ${cssClass}`}>
		<img src={src} alt={alt} />
	</div>
}