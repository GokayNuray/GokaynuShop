import {getShopItems} from "../services/ShopServices";
import {sortItems} from "../utils/ShopUtils";
import {useEffect, useState} from "react";
import {ItemCard} from "./ItemCard";

export function ShopBody({sortMethod, search}) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const tempItems = getShopItems();
        setItems(sortItems(tempItems, sortMethod));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tempItems = items ? [...items] : [];
    sortItems(tempItems, sortMethod);
    const filteredItems = tempItems.filter(item => item.name.includes(search));

    return (
        items &&
        <div>
            <div className="w-full h-full bg-cyan-500">
                {items.map((item) => (
                    <ItemCard item={item}
                              i={item.name.includes(search) ? filteredItems.indexOf(item) : -tempItems.indexOf(item)}
                              key={item.id}/>
                ))}
            </div>
        </div>
    )
}