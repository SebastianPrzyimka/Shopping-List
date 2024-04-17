import { useState } from 'react';

export default function App() {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [itemsShopping, setItemsShopping] = useState([]);
	const [text, setText] = useState('');

	function setInput(e) {
		setText(e.target.value);
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		const shoppingItems = [
			{ name, quantity: 0, id: new Date() },
			...itemsShopping,
		];

		setItemsShopping(shoppingItems);
		setText('');
	}

	return (
		<div className='container'>
			<Header input={text} setInput={setInput} onSubmit={handleSubmit} />
			<ShoppingList itemsShopping={itemsShopping} id={itemsShopping.id} />
		</div>
	);
}

function Header({ input, setInput, onSubmit }) {
	return (
		<>
			<h1>Shopping List 🍎</h1>
			<form>
				<input
					className='input-name'
					type='text'
					placeholder='Item Name'
					value={input}
					onChange={setInput}
				/>
				<input className='input-button' type='submit' onClick={onSubmit} />
			</form>
		</>
	);
}

function ShoppingList({ itemsShopping }) {
	return (
		<div className='elements'>
			<ul>
				{itemsShopping.map(item => (
					<Items name={item.name} items={item.quantity} key={item.id} />
				))}
			</ul>

			<span className='total'>Total items </span>
		</div>
	);
}

function Items({ name, items }) {
	return (
		<>
			<li>
				<div>
					<input className='checkbox' type='checkbox' /> {name}
				</div>
				<div>
					<button>◀️</button>
					<span>{items}</span>
					<button>▶️</button>
					<button className='delete'>🗑️</button>
				</div>
			</li>
		</>
	);
}
