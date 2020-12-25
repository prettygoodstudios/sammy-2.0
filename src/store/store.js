import { closeStore } from "..";
import { getCoins, getProducts, incrementCoins, updateProducts } from "../helpers/db";
import Product from "./product";
import jetpack1 from "../assets/JP1.svg";
import lazerImg from "../assets/lazerImg.svg";

export const LAZER_GUN_ID = 0;
export const JET_PACK_ID = 1;

export default class Store {
    constructor(){
        this.products = getProducts();
        this.productIndex = 0;
        this.balance = getCoins();
        this.equipButtonDiv = [];
        for(let i = 0; i < this.products.length; i++){
            this.equipButtonDiv.push(document.createElement("div"));
        } 
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

        this.products.forEach((product, i) => {
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
            }else{
                this.equipButtonDiv[i].appendChild(this.generateEquipButton(product));
            } 
            productDiv.appendChild(this.equipButtonDiv[i]);
            carousel.appendChild(productDiv);
        });
        this.filterCarousel();
    }

    generateEquipButton = (product) => {
        const equipButton = document.createElement("button");
        if(product.equipped){
            equipButton.innerHTML = "Deactivate";
            equipButton.addEventListener("click", this.deactivateProduct);
        }else{
            equipButton.innerHTML = "Equip!";
            equipButton.addEventListener("click", this.equipProduct);
        }
        return equipButton;
    }

    equipProduct = (e) => {
        const product = this.products[this.productIndex];
        product.equipped = true;
        updateProducts(this.products);
        this.equipButtonDiv[this.productIndex].innerHTML = "";
        this.equipButtonDiv[this.productIndex].appendChild(this.generateEquipButton(product));
    }

    deactivateProduct = (e) => {
        const product = this.products[this.productIndex];
        product.equipped = false;
        updateProducts(this.products);
        this.equipButtonDiv[this.productIndex].innerHTML = "";
        this.equipButtonDiv[this.productIndex].appendChild(this.generateEquipButton(product));
    }



    buyItem = (e) => {
        const product = this.products[this.productIndex];
        if(this.balance >= product.price && !product.bought){
            product.bought = true;
            this.balance -= product.price;
            incrementCoins(-product.price);
            this.updateBalance();
            e.target.style.display = "none";
            this.equipButtonDiv[this.productIndex].innerHTML = "";
            this.equipButtonDiv[this.productIndex].appendChild(this.generateEquipButton(product));
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
            new Product(LAZER_GUN_ID, "Laser Gun", "Shoots lasers!!!", lazerImg, 30),
            new Product(JET_PACK_ID, "Jet Pack", "Pretty Obvious Right?", jetpack1, 50)
        ]
    }
}