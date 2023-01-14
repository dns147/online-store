import { IdStorage } from './types';

export function checkFromLocalStorage(idProduct: string | null): void {
  const btnCart = document.querySelector('.btn-cart-description') as HTMLButtonElement;

  if (localStorage['idProductToCart']) {
    const idProductToCart: IdStorage = JSON.parse(localStorage['idProductToCart']);

    for (const key in idProductToCart) {
      if (key === idProduct) {
        btnCart.innerHTML = `DROP FROM CART (${idProductToCart[key]})`;
        btnCart.classList.add('active-btn');
        btnCart.setAttribute('data-count', idProductToCart[key]);
      }
    }
  }
}
