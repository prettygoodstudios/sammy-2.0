export default class Product {
    constructor(id, name, description, img, price){
        this.id = id;
        this.name = name;
        this.description = description;
        this.img = img;
        this.price = price;
        this.bought = false;
        this.equipped = false;
    }

    update(product){
        this.bought = product.bought;
        this.equipped = product.equipped;
    }
}