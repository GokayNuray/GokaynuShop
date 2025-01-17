import {sortItems} from "../utils/ShopUtils";
import {ItemCard} from "./ItemCard";

export function ShopBody({sortMethod, search, items}) {
    const tempItems = items && items !== "wait" ? [...items] : [];
    sortItems(tempItems, sortMethod);
    const filteredItems = tempItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    tempItems.filter(item => !filteredItems.includes(item)).filter(item => item.description.toLowerCase().includes(search.toLowerCase())).forEach(item => filteredItems.push(item));
    tempItems.filter(item => !filteredItems.includes(item)).filter(item => item.sellerProfile.name.toLowerCase().includes(search.toLowerCase())).forEach(item => filteredItems.push(item));

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
                                  i={filteredItems.includes(item) ? filteredItems.indexOf(item) : (-tempItems.indexOf(item) - 1)}
                                  key={item.id}/>
                    ))}
                </div>
            </div>)
    )
}