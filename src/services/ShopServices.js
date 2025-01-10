import {API} from "./ProfileServices";

export class ShopItem {
    constructor(id, name, price, description, img, date, sellerImg, sellerName) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
        this.date = date;
        this.sellerImg = sellerImg;
        this.sellerName = sellerName;
    }
}

function fetchShopItems(callback) {
    console.log("Fetching shop items");
    fetch(API + "get-items", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data);
            let items = [];
            for (let item of data.data) {
                items.push(new ShopItem(item.id, item.name, item.price, item.description, API + "avatars/items/" + item.id, item.date, "https://via.placeholder.com/150", "Unknown"));
            }
            callback(items);
        });
}

export function saveShopItems(items) {
    sessionStorage.setItem("items", JSON.stringify(items));
}

export function getShopItems(setItems) {
    let items = JSON.parse(sessionStorage.getItem("items"));
    if (!items) {
        setItems("wait");
        saveShopItems("wait");
        fetchShopItems((response) => {
            saveShopItems(response);
            setItems(response);
        });
    } else {
        setItems(items);
    }
}

export function createShopItem(owner, item, callback) {
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("price", item.price);
    formData.append("description", item.description);
    formData.append("avatar", item.avatar);
    formData.append("owner", owner);
    fetch("https://nameless.gokaynu.workers.dev/create-item", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        });
}