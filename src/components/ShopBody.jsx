import {getShopItems} from "../services/ShopServices";
import {sortItems} from "../utils/ShopUtils";

function ItemCard({ item }) {
    return (
        <li className="bg-white p-5 m-5 rounded-lg shadow-lg">
            <img src={item.img} alt={item.name} className="w-1/2 mx-auto"/>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-xl font-bold">${item.price}</p>
            <p>{item.description.substring(0,10) + "..."}</p>
        </li>
    )
}

export function ShopBody({sortMethod}) {
    const items = getShopItems();
    sortItems(items, sortMethod);
    const cards = items.map(item => <ItemCard item={item} key={item.id}/>);
    return (
        <div>
            <h1 className="text-center text-5xl font-sans" >Disclaimer: this is not a real shop and the items sold here are not real</h1>
            <ul className="grid grid-cols-3">
                {cards}
            </ul>
        </div>
    )
}