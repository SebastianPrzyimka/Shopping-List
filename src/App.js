import { useState } from 'react';

export default function App() {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [itemsShopping, setItemsShopping] = useState([]);
	const [text, setText] = useState('');

	// if error put bad shopping items in handleSubmit function
	console.log(setQuantity);
	const shoppingItems = [
		...itemsShopping,
		{ name: text, quantity: quantity, id: new Date() },
	];
	//
	function handleSubmit(e) {
		e.preventDefault();

		setItemsShopping(shoppingItems);
		setText('');
	}

	function handleDelete(id) {
		setItemsShopping(deleteItems => deleteItems.filter(item => item.id !== id));
	}

	function handleItem(id, increment) {
		setItemsShopping(prevItem =>
			prevItem.map(item => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + increment };
				}
				return item;
			})
		);
	}

	function handleAddItems() {
		return itemsShopping.reduce((total, item) => total + item.quantity, 0);
	}

	return (
		<div className='container'>
			<Header
				text={text}
				onSubmit={handleSubmit}
				setText={setText}
				setName={setName}
				name={name}
			/>
			<ShoppingList
				itemsShopping={itemsShopping}
				id={itemsShopping.id}
				onDelete={handleDelete}
				quantity={quantity}
				onHandleItem={handleItem}
				setQuantity={quantity}
				onAddItems={handleAddItems}
			/>
		</div>
	);
}

function Header({ text, onSubmit, setText }) {
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
				<input className='input-button' type='submit' onClick={onSubmit} />
			</form>
		</>
	);
}

function ShoppingList({
	itemsShopping,
	onDelete,
	onHandleItem,
	onAddItems,
	quantity,
}) {
	return (
		<div className='elements'>
			<ul>
				{itemsShopping.map(item => (
					<Items
						onDelete={onDelete}
						name={item.name}
						quantity={item.quantity}
						id={item.id}
						key={item.id}
						onHandleItem={onHandleItem}
					/>
				))}
			</ul>

			<span className='total'>Total items {onAddItems()}</span>
		</div>
	);
}

function Items({ name, quantity, onDelete, id, onHandleItem }) {
	return (
		<>
			<li>
				<div>
					<input className='checkbox' type='checkbox' /> {name}
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
