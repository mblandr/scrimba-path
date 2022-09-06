import './Paragraph.css'
export default function Paragraph({header, content, cssClass}) {
	return <section className={`para ${cssClass}`}>
	<h2>{header}</h2>
	<p>{content}</p>
	</section>
}