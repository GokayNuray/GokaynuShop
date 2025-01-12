import {useState} from "react";
import {createShopItem} from "../services/ShopServices";

export function SellPage({profile}) {
    const [showSell, setShowSell] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <div>
            <button onClick={() => setShowSell(true)}
                    className="bg-black text-white mt-5 size-64 font-bold">Sell an item
            </button>
            {showSell &&
                <div className="fixed bg-cyan-500 w-1/2 left-1/4 top-1/4 mt-5 p-5 rounded flex gap-4">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const avatar = e.target[0].files[0];
                        if (!(avatar && avatar.type.startsWith("image/"))) {
                            alert("Please select a valid image file");
                            return;
                        }
                        const name = e.target[1].value;
                        const description = e.target[2].value;
                        const price = e.target[3].value;
                        const owner = profile.id;
                        createShopItem(owner, {name, description, price, avatar}, (data) => {
                            if (!(data.id)) {
                                data.error ? alert(data.error) : alert("An error occurred");
                            } else {
                                alert("Item created successfully");
                                window.location.reload();
                            }
                        });
                    }} className="flex flex-row h-full w-full">
                        <div className="flex flex-col items-center w-1/2">
                            <img src={preview || "https://via.placeholder.com/150"} alt="Item" className="w-full"/>
                            <input required type="file" accept="image/*" className="mt-2" onChange={handleFileChange}/>
                        </div>
                        <div className="ml-5 flex flex-col h-full w-1/2">
                            <label className="mt-5">Item name</label>
                            <input required
                                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <label className="mt-5">Item description</label>
                            <textarea required
                                      className="resize-none w-full h-32 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            <div className="flex-grow"></div>
                            <div className="flex mt-32 items-center">
                                <div className="flex-grow"></div>
                                <label className="mr-2">Price($)</label>
                                <input required type="number" step="0.1"
                                       className="w-1/4 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                <button className="bg-black text-white p-2 rounded-r font-bold">Sell</button>
                            </div>
                        </div>
                    </form>
                </div>}
        </div>
    );
}