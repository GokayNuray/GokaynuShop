import {Profile} from "./Profile";
import {getCartLength} from "../services/ProfileServices";

export function ShopHeader() {
    const cartLength = getCartLength();

    return (
        <header className="bg-gradient-to-r from-green-400 to-black p-3 flex justify-between align-middle">
            <h1 className="text-5xl text-white font-bold ml-5 pointer-events-none select-none">Shop</h1>
            <input type="text" placeholder="Search..." className="bg-white text-black font-bold py-2 px-4 rounded-full mr-5 w-1/3"/>
            <div className="flex">
                <button className="bg-white text-black font-bold py-2 px-4 rounded-full mr-5">
                    {cartLength ? "Cart: " + cartLength + " items" : "Empty cart"}
                </button>
                <Profile />
            </div>
        </header>
    );
}