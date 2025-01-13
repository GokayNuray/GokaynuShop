import {useState} from "react";
import {createShopItem, removeShopItem} from "../services/ShopServices";
import {ListItem} from "./ListItem";
import {sortItems} from "../utils/ShopUtils";

export function SellPage({profile, items, setItems}) {
    const [showSell, setShowSell] = useState(false);
    const [sellStatus, setSellStatus] = useState("Sell");
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
    };

    const handleRemove = (id) => {
        removeShopItem(id, (data) => {
            if (data.error) {
                alert(data.error);
            } else {
                alert("Item removed from sale");
                setItems(null);
                window.location.reload();
            }
        });
    }

    const myItems = items && items !== "wait" && items.filter((item) => item.owner === profile.id);
    myItems && sortItems(myItems, 3);

    return (
        <div>
            <div className="flex items-center mt-10 px-2">
                <h1 className="text-4xl font-bold">Your items</h1>
                <button onClick={() => setShowSell(true)}
                        className="bg-blue-500 hover:bg-blue-700 text-white text-4xl font-bold ml-2 mt-2 px-3 pb-1 rounded-xl shadow-lg transition duration-300 ease-in-out">
                    +
                </button>
            </div>
            {myItems?.length > 0 ?
                <div className="flex-col mt-3 px-5">
                    {myItems && myItems.map((item) => {
                            return <ListItem key={item.id} item={item} count={-1} onDelete={() => handleRemove(item.id)}/>
                        }
                    )}
                </div>
                :
                <h1 className="text-4xl font-bold">{items === "wait" ? "Loading..." : "No items to show"}</h1>
            }
            {showSell &&
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    <div className="fixed bg-white w-1/2 left-1/4 top-1/4 mt-5 p-5 rounded-lg shadow-lg z-50">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const avatar = e.target[0].files[0];
                            if (!(avatar && avatar.type.startsWith("image/"))) {
                                alert("Please select a valid image file");
                                return;
                            }
                            const name = e.target[2].value;
                            const description = e.target[3].value;
                            const price = e.target[4].value;
                            const owner = profile.id;
                            setSellStatus("Selling...");
                            createShopItem(owner, {name, description, price, avatar}, (data) => {
                                if (!(data.id)) {
                                    data.error ? alert(data.error) : alert("An error occurred");
                                } else {
                                    alert("Item created successfully");
                                    setItems(null);
                                    window.location.reload();
                                }
                            });
                        }} className="flex flex-row h-full w-full">
                            <div className="flex flex-col items-center w-1/2">
                                <img src={preview || "https://via.placeholder.com/150"} alt="Item" className="w-full rounded-lg"/>
                                <input required type="file" accept="image/*" className="mt-2" onChange={handleFileChange}/>
                            </div>
                            <div className="ml-5 flex flex-col h-full w-1/2">
                                <button className="absolute size-10 top-2 right-2 bg-red-500 text-white p-2 rounded font-bold hover:bg-red-700"
                                        onClick={() => setShowSell(false)}>X</button>
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
                                    <button disabled={sellStatus !== "Sell"}
                                            className="bg-black text-white p-2 rounded-r font-bold hover:bg-gray-800">{sellStatus}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    );
}