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
            <div className="h-32 w-full bg-gradient-to-r from-green-400 to-black animate-shrinkAfterDelay"/>
            <h1 className="text-center text-6xl font-sans">Disclaimer: this is not a real shop and the items sold here
                are not real</h1>
            <div className="w-full h-full bg-cyan-500">
                {items && items.map((item) => (
                    <ItemCard item={item} i={tempItems.indexOf(item)} key={item.id}/>
                ))}
            </div>
        </div>
    )
}