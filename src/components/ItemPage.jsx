import {useEffect, useState} from "react";
import {getShopItems} from "../services/ShopServices";

export function ItemPage({id}) {
    const [items, setItems] = useState(null);
    const item = items && items !== "wait" && items.find(item => item.id === id);

    useEffect(() => {
        getShopItems(setItems);
    }, []);

    return (
        items && (items === "wait" ?
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-4xl">Loading...</h1>
            </div>
            :
            <div className="max-w-lg m-auto mt-10 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                <img className="rounded-lg mb-4" src={item.img} alt={item.name}/>
                <p className="text-lg text-gray-700 mb-4">{item.description}</p>
                <p className="text-2xl mb-4"><b>Sold by:</b> {item.sellerName} <img src={item.sellerImg}
                                                                                    alt={item.sellerName}
                                                                                    className="w-8 h-8 inline-block rounded-full"/>
                </p>
                <p className="text-right text-2xl text-blue-600 mb-4">${item.price}</p>
                <button className="block ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
                    Add to Cart
                </button>
            </div>)
    )
}