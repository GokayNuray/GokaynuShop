import {getShopItems} from "../services/ShopServices";

export function sortItems(items, sortMethod) {
    return items.sort((a, b) => {
        switch (sortMethod) {
            case 0:
                return a.price - b.price;
            case 1:
                return b.price - a.price;
            case 2:
                return new Date(a.date) - new Date(b.date);
            case 3:
                return new Date(b.date) - new Date(a.date);
            default:
                throw new Error("Invalid sort method");
        }
    });
}

export function getItemById(id) {
    let items = getShopItems();
    return items.find(item => item.id === parseInt(id));
}