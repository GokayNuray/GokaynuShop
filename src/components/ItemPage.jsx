import {useEffect, useState} from "react";
import {addToCart, saveProfile} from "../services/ProfileServices";
import {useNavigate, useParams} from "react-router-dom";

export function ItemPage({items, profile, setProfile}) {
    const {id} = useParams();
    const item = items && items !== "wait" && items.find(item => item.id === parseInt(id));
    const [cartStatus, setCartStatus] = useState("Add to Cart");
    const navigate = useNavigate();

    useEffect(() => {
        if (profile?.cart && items) {
            const cart = profile.cart;
            if (cart[id]) setCartStatus("In Cart");
        }
    }, [id, items, profile]);

    const handleClick = () => {
        if (!profile) {
            alert("You need to be logged in to add items to cart");
            return;
        }
        if (cartStatus === "Add to Cart") {
            setCartStatus("Adding...");
            addToCart(profile.id, item, (data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    profile.cart = data;
                    saveProfile(profile);
                    setProfile({...profile});
                    alert("Item added to cart");
                    setCartStatus("In Cart");
                }
            });
        } else if (cartStatus === "In Cart") {
            navigate("/cart");
        }
    }

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
                {item.sellerProfile && (item.sellerProfile === "wait" ?
                    <p>Loading...</p>
                    :

                    <p className="text-2xl mb-4"><b>Sold by:</b> {item.sellerProfile.name} <img src={item.sellerProfile.profilePic}
                                                                                    alt={item.sellerProfile.name}
                                                                                    className="size-12 inline-block rounded-full"/>
                    </p>)}
                <p className="text-right text-2xl text-blue-600 mb-4">${item.price}</p>
                <button className="block ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800" onClick={handleClick} disabled={cartStatus === "Adding..."}>
                    {cartStatus}
                </button>
            </div>)
    )
}