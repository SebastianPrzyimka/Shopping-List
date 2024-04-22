export function Items({
	name,
	quantity,
	onDelete,
	id,
	onHandleItem,
	check,
	isOpen,
}) {
	return (
		<>
			<li>
				<div className={isOpen ? 'check' : 'li-text'}>
					<input
						checked={isOpen}
						onChange={() => check(id)}
						className='checkbox'
						type='checkbox'
					/>
					{name}
				</div>
				<div>
					<button
						className='arrow'
						onClick={() => onHandleItem(id, quantity >= 1 ? -1 : 0)}
					>
						◀️
					</button>
					<span>{quantity}</span>
					<button className='arrow' onClick={() => onHandleItem(id, 1)}>
						▶️
					</button>
					<button onClick={() => onDelete(id)} className='delete'>
						🗑️
					</button>
				</div>
			</li>
		</>
	);
}
