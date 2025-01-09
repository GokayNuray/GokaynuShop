import {Profile} from "./Profile";
import {getProfile} from "../services/ProfileServices";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const sortMethods = [
    "Price(low to high)",
    "Price(high to low)",
    "Most recent first",
    "Oldest first"
];

export function ShopHeader({sortMethod, setSortMethod, setSearch}) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            sessionStorage.setItem("sawDisclaimer", 1);
        }, 3000);
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleTitleClick = () => {
        navigate("/");
    }

    const onMainPage = location.pathname === "/";

    const profile = getProfile();

    return (
        <>
            <header
                className="bg-gradient-to-r from-green-400 to-black p-3 flex justify-between align-middle fixed top-0 right-0 left-0 z-10">
                <h1 className={"text-5xl text-white font-bold ml-5 select-none " + (onMainPage ? "pointer-events-none" : "cursor-pointer" )} onClick={handleTitleClick}>Shop</h1>
                <div className="flex w-2/5">
                    <input type="text" placeholder="Search..." onChange={handleSearchChange}
                           className="bg-white text-black font-bold py-2 px-4 rounded-full mr-5 w-full peer ml-3 focus:ml-0"/>
                    <button className="bg-white text-black font-bold py-2 px-4 rounded-full peer-focus:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button
                        className="bg-white text-black font-bold py-2 px-4 rounded-full ml-16 w-full peer-focus:hidden"
                        onClick={() => setSortMethod((sortMethod + 1) % 4)}>
                        sorted by:<br/>{sortMethods[sortMethod]}
                    </button>
                </div>
                {profile ?
                    <div className="flex">
                    <button className="bg-white text-black font-bold py-2 px-4 rounded-full mr-5">
                        {profile.cart ? "Cart: " + profile.cart + " items" : "Empty cart"}
                    </button>
                    <Profile profile={profile}/>
                </div>
                :
                <button className="bg-white text-black font-bold py-2 px-4 rounded-full mr-5" onClick={() => navigate("/login")}>
                    Login
                </button>
                }
            </header>
            {!sessionStorage.getItem("sawDisclaimer") &&
                <div className="h-32 w-full bg-gradient-to-r from-green-400 to-black animate-shrinkAfterDelay"/>}
            <h1 className="text-center text-6xl font-sans">Disclaimer: this is not a real shop and the items sold here
                are not real</h1>
        </>
    );
}