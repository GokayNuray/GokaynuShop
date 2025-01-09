import {ShopHeader} from "./ShopHeader";
import {ShopBody} from "./ShopBody";
import {useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ItemPage} from "./ItemPage";

export function ShopPage() {
    let [sortMethod, setSortMethod] = useState(0);
    let [search, setSearch] = useState("");
    const location = useLocation();
    const {id} = useParams();

    return (
        <div>
            <ShopHeader sortMethod={sortMethod} setSortMethod={setSortMethod} setSearch={setSearch}/>
            {location.pathname === "/" ?
                <ShopBody sortMethod={sortMethod} search={search}/>
                :
                <div>
                    <ItemPage id={id}/>
                </div>
            }
        </div>
    )
}