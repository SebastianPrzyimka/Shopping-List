export function Header({ text, onSubmit, setText, onDeleteAll, isSubmited }) {
	return (
		<>
			<h1>Shopping List 🍎</h1>
			<form>
				<input
					className='input-name'
					type='text'
					placeholder='Item Name'
					value={text}
					onChange={e => setText(e.target.value)}
				/>
				{isSubmited && !text && <p className='error'>Cant add empty field </p>}
				<input className='input-button' type='submit' onClick={onSubmit} />
				<button onClick={onDeleteAll} className='delete-all'>
					Delete All
				</button>
			</form>
		</>
	);
}
