import {sortItems} from "../utils/ShopUtils";
import {ItemCard} from "./ItemCard";

export function ShopBody({sortMethod, search, items}) {
    const tempItems = items && items !== "wait" ? [...items] : [];
    sortItems(tempItems, sortMethod);
    const filteredItems = tempItems.filter(item => item.name.includes(search));

    return (
        items && (items === "wait" ?
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-4xl">Loading...</h1>
            </div>
            :
            <div>
                <div className="w-full h-full bg-cyan-500">
                    {items.map((item) => (
                        <ItemCard item={item}
                                  i={item.name.includes(search) ? filteredItems.indexOf(item) : -tempItems.indexOf(item)}
                                  key={item.id}/>
                    ))}
                </div>
            </div>)
    )
}