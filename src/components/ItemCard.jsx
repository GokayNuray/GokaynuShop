import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function ItemCard({item, i}) {
    const sellerProfile = item.sellerProfile;
    const navigate = useNavigate();
    const [style, setStyle] = useState(null);
    const handleClick = () => {
        const newStyle = {
            transform: `translateX(100%) translateY(100%) translateY(${window.scrollY}px)scale(3)`
        }
        setStyle(newStyle);
        setTimeout(() => navigate("/item/" + item.id), 700);
    }

    useEffect(() => {
        setStyle(i < 0 ? {
                opacity: 0,
                transform: "translateX(" + ((-i - 1) % 3) * 100 + "%) translateY(" + Math.floor((-i - 1) / 3) * 100 + "%)",
                zIndex: -Infinity
            } : {
                transform: "translateX(" + (i % 3) * 100 + "%) translateY(" + Math.floor(i / 3) * 100 + "%)",
                zIndex: -i -1
            }
        );
    }, [i]);

    return (
        style &&
        <button
            className="absolute h-2/5 bg-white w-[calc(33.33%-1rem)] p-5 m-5 rounded-lg shadow-lg transition duration-700 hover:w-1/3 hover:bg-gray-300"
            style={style} onClick={handleClick}>
            <img src={item.img} alt={item.name} className="max-w-100% h-56 mx-auto"/>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-xl font-bold">${item.price}</p>
            <p className="text-gray-700">{item.description.substring(0, 10) + "..."}</p>
            {sellerProfile && (sellerProfile === "wait" ?
                <p>Loading...</p>
                :
                <p>{sellerProfile.name} <img src={sellerProfile.profilePic} alt={sellerProfile.name}
                                          className="w-8 h-8 inline-block rounded-full"/></p>)}
        </button>
    )
}
