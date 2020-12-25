export default class Product {
    constructor(id, name, description, img, price){
        this.id;
        this.name = name;
        this.description = description;
        this.img = img;
        this.price = price;
        this.bought = false;
        this.equiped = false;
    }

    update(product){
        this.bought = product.bought;
        this.equiped = product.equiped;
    }
}