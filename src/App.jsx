// import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoginPage} from "./components/LoginPage";
import {SellPage} from "./components/SellPage";
import {CartPage} from "./components/CartPage";
import {useEffect, useState} from "react";
import {getShopItems} from "./services/ShopServices";
import {getProfile} from "./services/ProfileServices";
import {ShopHeader} from "./components/ShopHeader";
import {ItemPage} from "./components/ItemPage";
import {ShopBody} from "./components/ShopBody";

function App() {
    const [profile, setProfile] = useState();
    const [items, setItems] = useState();
    const [sortMethod, setSortMethod] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getProfile(setProfile);
        getShopItems(setItems);
    }, []);

    return (
        <BrowserRouter>
            <ShopHeader sortMethod={sortMethod} setSortMethod={setSortMethod} setSearch={setSearch} profile={profile} />
            <Routes>
                <Route path="/" element={<ShopBody items={items} sortMethod={sortMethod} search={search}/>}/>
                <Route path={"/item/:id"} element={<ItemPage items={items} profile={profile} setProfile={setProfile}/>}/>
                <Route path="/login" element={<LoginPage setProfile={setProfile}/>}/>
                <Route path="/sell" element={<SellPage profile={profile}/>}/>
                <Route path={"/cart"} element={<CartPage profile={profile} setProfile={setProfile} items={items}/>}/>
                <Route path="/*" element={<h1>404 Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
