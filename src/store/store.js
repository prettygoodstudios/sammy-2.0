import { closeStore } from "..";
import { getCoins, getProducts, incrementCoins, updateProducts } from "../helpers/db";
import Product from "./product";
import jetpack1 from "../assets/Jetpack1.svg";

export default class Store {
    constructor(){
        this.products = getProducts();
        this.productIndex = 0;
        this.balance = getCoins();
        this.updateBalance();
        this.generateCarousel();
        this.leftListener = document.querySelector(".store__carousel-row > .left").addEventListener("click", this.decrementCarousel);
        this.rightListener = document.querySelector(".store__carousel-row > .right").addEventListener("click", this.incrementCarousel);
        this.goHome = document.querySelector("#storeGoHome").addEventListener("click", this.close);
    }

    updateBalance = () => {
        document.getElementById("storeBalance").innerHTML = this.balance;
    }

    generateCarousel = () => {
        const carousel = document.querySelector("#carousel");
        carousel.innerHTML = "";

        this.products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "store__carousel-row__content__product";
            const title = document.createElement("h1");
            title.innerHTML = product.name;
            const image = new Image();
            image.src = product.img;
            const description = document.createElement("p");
            description.innerHTML = product.description;
            const buyButton = document.createElement("button");
            buyButton.innerHTML = "Buy - $"+product.price;
            buyButton.addEventListener("click", this.buyItem);

            productDiv.appendChild(title);
            productDiv.appendChild(image);
            productDiv.appendChild(description);
            if(!product.bought){
                productDiv.appendChild(buyButton);
            }
            carousel.appendChild(productDiv);
        });
        this.filterCarousel();
    }

    buyItem = (e) => {
        const product = this.products[this.productIndex];
        if(this.balance >= product.price && !product.bought){
            product.bought = true;
            this.balance -= product.price;
            incrementCoins(-product.price);
            this.updateBalance();
            e.target.style.display = "none";
            updateProducts(this.products);
        }
        
    }

    filterCarousel = () => {
        document.querySelectorAll(".store__carousel-row__content__product").forEach((p, i) => {
            p.style.display = this.productIndex == i ? "flex" : "none";
        });
    }

    incrementCarousel = () => {
        this.productIndex += 1;
        this.productIndex %= this.products.length;
        this.filterCarousel();
    }

    decrementCarousel = () => {
        this.productIndex -= 1;
        this.productIndex = this.productIndex >= 0 ? this.productIndex : this.products.length-1;
        this.filterCarousel();
    }

    close = () => {
        document.removeEventListener("click", this.leftListener);
        document.removeEventListener("click", this.rightListener);
        document.removeEventListener("click", this.goHome);
        delete this.products;
        delete this.productIndex;
        closeStore();
    }

    static getItemsForSale(){
        return [
            new Product("Laser Gun", "Shoots lasers!!!", null, 30),
            new Product("Jet Pack", "Pretty Obvious Right?", jetpack1, 50)
        ]
    }
}