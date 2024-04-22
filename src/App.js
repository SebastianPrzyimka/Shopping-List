import { useEffect, useState } from 'react';
import { ShoppingList } from './ShoppingList';
import { Header } from './Header';

export default function App() {
	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [itemsShopping, setItemsShopping] = useState([]);
	const [text, setText] = useState('');
	const [isSubmited, setIsSubmited] = useState(false);

	console.log(setQuantity);

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
		if (!text) {
			setIsSubmited(true);
			return;
		}
		setIsSubmited(false);
		setItemsShopping(shoppingItems);
		setText('');

		localStorage.setItem('list', JSON.stringify(shoppingItems));
	}

	function handleDelete(id) {
		setItemsShopping(deleteItems => deleteItems.filter(item => item.id !== id));

		const updatedList = itemsShopping.filter(item => item.id !== id);
		localStorage.setItem('list', JSON.stringify(updatedList));
	}

	function handleDeleteAll(e) {
		e.preventDefault();
		setItemsShopping([]);

		localStorage.setItem('list', JSON.stringify([]));
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
					const updatedItem = { ...item, quantity: 0, isOpen: !item.isOpen };

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

	return (
		<div className='container'>
			<Header
				text={text}
				onSubmit={handleSubmit}
				setText={setText}
				setName={setName}
				name={name}
				onDeleteAll={handleDeleteAll}
				isSubmited={isSubmited}
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
