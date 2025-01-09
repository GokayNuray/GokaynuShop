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

function fetchShopItems() {
    console.log("Fetching items");
    let items = [];
    for (let i = 0; i < 17; i++) {
        items.push(new ShopItem(i, "Item " + i, 10 + i, (`Description for item ${i} \n`).repeat(40), "https://www.w3schools.com/howto/img_avatar.png", new Date(Math.random() * 100000000000), "https://www.w3schools.com/howto/img_avatar.png", "John Merchant"));
    }
    sessionStorage.setItem("items", JSON.stringify(items));
}

export function getShopItems() {
    let items = JSON.parse(sessionStorage.getItem("items"));
    if (!items) {
        fetchShopItems();
        items = JSON.parse(sessionStorage.getItem("items"));
    }
    return items;
}