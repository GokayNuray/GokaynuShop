import {useNavigate} from "react-router-dom";

export function ItemCard({item, i}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/item/" + item.id);
    }

    const style= {
        transform: "translateX(" + (i % 3) * 100 + "%) translateY(" + Math.floor(i / 3) * 100 + "%)",
        zIndex: - i
    }

    return (
        <button className="absolute bg-white w-[calc(33.33%-1rem)] p-5 m-5 rounded-lg shadow-lg transition duration-700 hover:w-1/3 hover:bg-gray-300"
                style={style} onClick={handleClick}>
            <img src={item.img} alt={item.name} className="w-1/2 mx-auto"/>
            <h1 className="text-3xl font-bold">{item.name}</h1>
            <p className="text-xl font-bold">${item.price}</p>
            <p>{item.description.substring(0, 10) + "..."}</p>
        </button>
    )
}
