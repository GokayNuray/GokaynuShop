import {ShopHeader} from "./ShopHeader";
import {ShopBody} from "./ShopBody";
import {useState} from "react";

export function ShopPage() {
    let [sortMethod, setSortMethod] = useState(0);
    return (
        <div>
            <ShopHeader sortMethod={sortMethod} setSortMethod={setSortMethod}/>
            <ShopBody sortMethod={sortMethod}/>
        </div>
    )
}