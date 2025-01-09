import {getItemById} from "../utils/ShopUtils";

export function ItemPage({id}) {
    let item = getItemById(id);
    return (
        <div className="max-w-lg m-auto mt-10 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <img className="rounded-lg mb-4" src={item.img} alt={item.name}/>
            <p className="text-lg text-gray-700 mb-4">{item.description}</p>
            <p className="text-right text-2xl text-blue-600 mb-4">${item.price}</p>
            <button className="block ml-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
                Add to Cart
            </button>
        </div>
    )
}