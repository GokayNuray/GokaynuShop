import {getShopItems} from "../services/ShopServices";
import {sortItems} from "../utils/ShopUtils";
import {useEffect, useState} from "react";
import {ItemCard} from "./ItemCard";

export function ShopBody({sortMethod}) {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const tempItems = getShopItems();
        setItems(sortItems(tempItems, sortMethod));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tempItems = items ? [...items] : [];
    sortItems(tempItems, sortMethod);

    return (
        <div>
            <div className="w-full h-full bg-cyan-500">
                {items && items.map((item) => (
                    <ItemCard item={item} i={tempItems.indexOf(item)} key={item.id}/>
                ))}
            </div>
        </div>
    )
}