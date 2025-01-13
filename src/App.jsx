// import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from "./components/LoginPage";
import {SellPage} from "./components/SellPage";
import {CartPage} from "./components/CartPage";
import {useEffect, useState} from "react";
import {getShopItems, saveShopItems} from "./services/ShopServices";
import {getOtherProfile, getProfile} from "./services/ProfileServices";
import {ShopHeader} from "./components/ShopHeader";
import {ItemPage} from "./components/ItemPage";
import {ShopBody} from "./components/ShopBody";
import {WalletPage} from "./components/WalletPage";

function App() {
    const [profile, setProfile] = useState();
    const [items, setItems] = useState();
    const [sortMethod, setSortMethod] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getProfile(setProfile);
        getShopItems((items) => {
            if (items === "wait") {
                setItems("wait");
                return;
            }
            const otherProfiles = {};
            items.forEach((item) => {
                if (!otherProfiles[item.owner]) {
                    otherProfiles[item.owner] = [item];
                } else {
                    otherProfiles[item.owner].push(item);
                }
            });
            Object.keys(otherProfiles).forEach((key) => {
                getOtherProfile(key, (profile) => {
                    otherProfiles[key].forEach((item) => {
                        item.sellerProfile = profile;
                    });
                    saveShopItems(null);
                    setItems([...items]);
                });
            });
        });
    }, []);

    return (
        <BrowserRouter>
            <ShopHeader sortMethod={sortMethod} setSortMethod={setSortMethod} setSearch={setSearch} profile={profile} />
            <Routes>
                <Route path="/" element={<ShopBody items={items} sortMethod={sortMethod} search={search}/>}/>
                <Route path={"/item/:id"} element={<ItemPage items={items} profile={profile} setProfile={setProfile}/>}/>
                <Route path="/login" element={<LoginPage setProfile={setProfile}/>}/>
                <Route path="/sell" element={<SellPage profile={profile} items={items} setItems={setItems}/>}/>
                <Route path="/wallet" element={<WalletPage profile={profile} setProfile={setProfile}/>}/>
                <Route path="/cart" element={<CartPage profile={profile} setProfile={setProfile} items={items}/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
