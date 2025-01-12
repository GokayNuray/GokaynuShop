import {useEffect, useState} from "react";
import {getProfile} from "../services/ProfileServices";
import {getShopItems} from "../services/ShopServices";
import {ListItem} from "./ListItem";
import {ShopHeader} from "./ShopHeader";

export function CartPage() {
    const [profile, setProfile] = useState();
    const [items, setItems] = useState();
    const [total, setTotal] = useState(0);
    const [counts, setCounts] = useState({});

    useEffect(() => {
        getProfile(setProfile);
        getShopItems(setItems);
    }, []);

    const setCount = (item, count) => {
        const newCounts = {...counts};
        let totalWithoutItem = total - (newCounts[item.id] || 0) * item.price;
        newCounts[item.id] = count;
        setCounts(newCounts);
        setTotal(totalWithoutItem + count * item.price);
    }

    const handleDelete = (item) => {
        const newCounts = {...counts};
        let totalWithoutItem = total - (newCounts[item.id] || 0) * item.price;
        delete newCounts[item.id];
        setCounts(newCounts);
        setTotal(totalWithoutItem);
    }

    return (
        <div>
            <ShopHeader/>
            <h1 className="text-4xl font-bold mt-10 m-4">Your Cart</h1>
            {(profile && items && profile !== "wait" && items !== "wait") ? (
                <div className="px-4">
                    {Object.keys(profile.cart).map((key) => {
                        console.log(key);
                        console.log(items);
                        const item = items.find(item => item.id === parseInt(key));
                        console.log(item);
                        return (
                            <ListItem key={key} item={item} count={counts[key] || 0} setCount={(count) => setCount(item, count)}
                                      onDelete={() => handleDelete(item)}/>
                        )
                    })}
                    <div className="text-2xl font-bold mt-4">Total: ${total}</div>
                </div>
            ) : (
                    <h1 className="text-4xl">Loading...</h1>
            )}
        </div>
    );

}