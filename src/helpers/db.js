
const COINS_KEY = 'COINS_KEY';

export const incrementCoins = (coins) => {
    localStorage.setItem(COINS_KEY, getCoins() + coins);
}

export const getCoins = () => {
    const currentValue = localStorage.getItem(COINS_KEY);
    return currentValue ? parseInt(currentValue) : 0; 
}