import { Items } from './Items';

export function ShoppingList({
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
