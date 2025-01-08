export class ShopItem {
    constructor(id, name, price, description, img, date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
        this.date = date;
    }
}

export function getShopItems() {
    let items = [];
    for (let i = 0; i < 17; i++) {
        items.push(new ShopItem(i, "Item " + i, 10 + i, "Description for item " + i, "https://www.w3schools.com/howto/img_avatar.png", new Date(Math.random() * 100000000000)));
    }
    return items;
}