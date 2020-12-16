import Store from "../store/store";

const PROUDCTS_KEY = 'PRODUCTS';
const COINS_KEY = 'COINS_KEY';

export const incrementCoins = (coins) => {
    localStorage.setItem(COINS_KEY, getCoins() + coins);
}

export const getCoins = () => {
    const currentValue = localStorage.getItem(COINS_KEY);
    return currentValue ? parseInt(currentValue) : 0; 
}

export const updateProducts = (products) => {
    localStorage.setItem(PROUDCTS_KEY, JSON.stringify(products));
}

export const getProducts = () => {
    const products = localStorage.getItem(PROUDCTS_KEY);
    if (products){
        return JSON.parse(products);
    }
    updateProducts(Store.getItemsForSale());
    return getProducts();
}