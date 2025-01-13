import {API} from "./ProfileServices";

export class ShopItem {
    constructor(id, name, price, description, img, date, owner) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
        this.date = date;
        this.owner = owner;
    }
}

function fetchShopItems(callback) {
    fetch(API + "get-items", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            let items = [];
            for (let item of data.data) {
                items.push(new ShopItem(item.id, item.name, item.price, item.description, API + "avatars/items/" + item.id, new Date(item.created_at), item.owner));
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

export function removeShopItem(id, callback) {
    fetch("https://nameless.gokaynu.workers.dev/remove-item", {
        method: "POST",
        body: JSON.stringify({id}),
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        });
}