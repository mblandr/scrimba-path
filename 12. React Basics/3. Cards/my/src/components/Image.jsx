import './Image.css'
export default function Image({ src, alt, className }) {
	const classes = ['img']
	className && classes.push(className)
	const classNames = classes.join(' ')
	return <div className={classNames}>
		<img src={src} alt={alt} />
	</div>
}