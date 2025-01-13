import {useEffect, useState} from "react";
import {removeFromCart, saveProfile} from "../services/ProfileServices";
import {ListItem} from "./ListItem";

export function CartPage({profile, setProfile, items}) {
    const [total, setTotal] = useState(0);
    const [counts, setCounts] = useState({});

    const cartItems = profile?.cart && items && items !== "wait" && Object.keys(profile.cart).map((key) => items.find(item => item.id === parseInt(key)));


    useEffect(() => {
        if (profile?.cart && items) {
            const counts = {};
            let total = 0;
            Object.keys(profile.cart).forEach((key) => {
                const item = items.find(item => item.id === parseInt(key));
                total += item.price * profile.cart[key];
                counts[key] = profile.cart[key];
            });
            setCounts(counts);
            setTotal(total);
        }
    }, [items, profile]);

    const setCount = (item, count) => {
        const newCounts = {...counts};
        let totalWithoutItem = total - (newCounts[item.id] || 0) * item.price;
        newCounts[item.id] = count;
        setCounts(newCounts);
        setTotal(totalWithoutItem + count * item.price);
    }

    const handleDelete = (item) => {
        removeFromCart(profile.id, item, (data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert("Item removed from cart");
                profile.cart = data;
                saveProfile(profile);
                setProfile({...profile});
            }
        });
    }

    return (
        <div>
            <h1 className="text-4xl font-bold mt-10 m-4">Your Cart</h1>
            {cartItems?.length > 0 ?
                <div className="px-4">
                    {cartItems.map((item) => {
                        return (
                            <ListItem key={item.id} item={item} count={counts[item.id] || 0} setCount={(count) => setCount(item, count)}
                                      onDelete={() => handleDelete(item)}/>
                        )
                    })}
                    <div className="text-2xl font-bold mt-4">Total: ${total}</div>
                </div>
             :
                    <h1 className="text-4xl">{(items === "wait" || profile === "wait") ? "Loading..." : "No items in cart"}</h1>
            }
        </div>
    );

}