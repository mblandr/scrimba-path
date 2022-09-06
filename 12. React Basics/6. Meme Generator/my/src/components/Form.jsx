import './Form.css'
import { useRef } from 'react'
export default function Form({ onInput, onSend }) {
	const firstRef = useRef(),
		secondRef = useRef(),
		handleInput = e => {
			onInput({
				first: firstRef.current.value.trim(),
				second: secondRef.current.value.trim(),
			})
		},
		handleSubmit = e => {
			e.preventDefault()
			onSend(
				{
					first: firstRef.current.value.trim(),
					second: secondRef.current.value.trim(),
				}
			)
		}
	return (

		<form onSubmit={handleSubmit}>
			<input
				ref={firstRef}
				name='first'
				onChange={handleInput}
				placeholder='Shut up' />
			<input
				ref={secondRef}
				name='second'
				onChange={handleInput}
				placeholder='and take my money' />
			<button>
				Get a new meme image ⚽
			</button>
		</form>

	)
}
