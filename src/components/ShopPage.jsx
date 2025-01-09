import {ShopHeader} from "./ShopHeader";
import {ShopBody} from "./ShopBody";
import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ItemPage} from "./ItemPage";

export function ShopPage() {
    let [sortMethod, setSortMethod] = useState(0);
    const location = useLocation();
    const {id} = useParams();

    return (
        <div>
            <ShopHeader sortMethod={sortMethod} setSortMethod={setSortMethod}/>
            {location.pathname === "/" ?
                <ShopBody sortMethod={sortMethod}/>
                :
                <div>
                    <ItemPage id={id}/>
                </div>
            }
        </div>
    )
}