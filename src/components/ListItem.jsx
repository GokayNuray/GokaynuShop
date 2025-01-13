import {useState} from "react";

export function ListItem({item, count, setCount, onDelete}) {
    const [deleting, setDeleting] = useState(false);
    const handleDelete = () => {
        if (deleting) return;
        setDeleting(true);
        onDelete();
    }
    return (
        <div className="flex flex-row items-center justify-between border-2 border-gray-200 p-2 rounded-xl mb-2">
            <div className="flex flex-row items-center gap-4">
                <img src={item.img} alt={item.name} className="rounded-lg w-20 h-20"/>
                <div>
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <p className="text-lg text-gray-700">{item.description}</p>
                    <p className="text-lg text-blue-600">${item.price}</p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                { count > 1 && <button onClick={() => setCount(count - 1)} className="bg-red-500 text-white px-4 py-2 rounded">-</button>}
                { count > 0 && <p className="text-2xl">{count}</p>}
                { count > 0 && <button onClick={() => setCount(count + 1)} className="bg-green-500 text-white px-4 py-2 rounded">+</button>}
                <button disabled={deleting} onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">{deleting ? "Removing..." : "Remove"}</button>
            </div>
        </div>
    )
}