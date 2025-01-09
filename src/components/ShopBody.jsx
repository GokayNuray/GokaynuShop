import {getShopItems} from "../services/ShopServices";
import {sortItems} from "../utils/ShopUtils";
import {useEffect, useState} from "react";

function ItemCard({item, i}) {

    const style= {
        transform: "translateX(" + (i % 3) * 100 + "%) translateY(" + Math.floor(i / 3) * 100 + "%)",
        zIndex: - i
    }

    return (
        <div className="absolute bg-white w-[calc(33.33%-1rem)] p-5 m-5 rounded-lg shadow-lg transition duration-700" style={style}>
            <img src={item.img} alt={item.name} className="w-1/2 mx-auto"/>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-xl font-bold">${item.price}</p>
            <p>{item.description.substring(0, 10) + "..."}</p>
        </div>
    )
}

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
            <div className="h-32 bg-gradient-to-r from-green-400 to-black animate-shrinkAfterDelay"/>
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