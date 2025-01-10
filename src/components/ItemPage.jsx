import {useEffect, useState} from "react";
import {getShopItems} from "../services/ShopServices";
import {getOtherProfile} from "../services/ProfileServices";

export function ItemPage({id}) {
    const [items, setItems] = useState(null);
    const item = items && items !== "wait" && items.find(item => item.id === id);
    const [seller, setSeller] = useState(null);

    useEffect(() => {
        getShopItems(setItems);
    }, []);

    useEffect(() => {
        if (!items || items === "wait") return;
        const item = items.find(item => item.id === id);
        getOtherProfile(item.owner, setSeller);

    }, [id, items]);

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
                {seller && (seller === "wait" ?
                    <p>Loading...</p>
                    :

                    <p className="text-2xl mb-4"><b>Sold by:</b> {seller.name} <img src={seller.profilePic}
                                                                                    alt={seller.name}
                                                                                    className="size-12 inline-block rounded-full"/>
                    </p>)}
                <p className="text-right text-2xl text-blue-600 mb-4">${item.price}</p>
                <button className="block ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
                    Add to Cart
                </button>
            </div>)
    )
}