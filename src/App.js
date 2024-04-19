import { useEffect, useState } from 'react';

export default function App() {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [itemsShopping, setItemsShopping] = useState([]);
	const [text, setText] = useState('');

	// if error put bad shopping items in handleSubmit function

	const shoppingItems = [
		...itemsShopping,
		{ name: text, quantity: quantity, isOpen: false, id: new Date() },
	];

	useEffect(() => {
		const storedList = JSON.parse(localStorage.getItem('list'));
		if (storedList) {
			setItemsShopping(storedList);
		}
	}, []);

	//
	function handleSubmit(e) {
		e.preventDefault();

		setItemsShopping(shoppingItems);
		setText('');

		localStorage.setItem('list', JSON.stringify(shoppingItems));

		return shoppingItems;
	}

	function handleDelete(id) {
		setItemsShopping(deleteItems => deleteItems.filter(item => item.id !== id));

		const updatedList = itemsShopping.filter(item => item.id !== id);
		localStorage.setItem('list', JSON.stringify(updatedList));
	}

	function handleItem(id, increment) {
		setItemsShopping(prevItem =>
			prevItem.map(item => {
				if (item.id === id) {
					const updatedItem = { ...item, quantity: item.quantity + increment };

					const updatedList = prevItem.map(item =>
						item.id === id ? updatedItem : item
					);
					localStorage.setItem('list', JSON.stringify(updatedList));
					return updatedItem;
				}

				return item;
			})
		);
	}

	function handleAddItems() {
		return itemsShopping.reduce((total, item) => total + item.quantity, 0);
	}

	function check(id) {
		setItemsShopping(prevItem =>
			prevItem.map(item => {
				if (item.id === id) {
					return { ...item, quantity: 0, isOpen: !item.isOpen };
				}
				return item;
			})
		);
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
				check={check}
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
	check,
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
						check={check}
						isOpen={item.isOpen}
					/>
				))}
			</ul>

			<span className='total'>Total items {onAddItems()}</span>
		</div>
	);
}

function Items({ name, quantity, onDelete, id, onHandleItem, check, isOpen }) {
	return (
		<>
			<li>
				<div className={isOpen ? 'check' : 'li-text'}>
					<input
						onClick={() => check(id)}
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
