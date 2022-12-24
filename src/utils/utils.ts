import products from "../assets/json/products.json";
import { IOptionsProducts } from "./types";

export function makeCardProduct(): void {
  const contentsContainer = document.querySelector('.catalog-list') as HTMLElement;

  products.forEach((product: IOptionsProducts) => {
    const cardMain: HTMLDivElement = document.createElement('div');
    const cardProduct: HTMLDivElement = document.createElement('div');
    const cardName: HTMLHeadingElement = document.createElement('h3');
    const image: HTMLImageElement = document.createElement('img');
    const list: HTMLUListElement = document.createElement('ul');
    const listCategory: HTMLLIElement = document.createElement('li');
    const listBrand: HTMLLIElement = document.createElement('li');
    const listStock: HTMLLIElement = document.createElement('li');
    const listPrice: HTMLLIElement = document.createElement('li');
    const cartContainer: HTMLDivElement = document.createElement('div');

    cardName.innerHTML = product.title;
    image.src = product.images[0];
    image.alt = `image`;
    listCategory.innerHTML = `<span class="list-name">Category: </span>${product.category}`
    listBrand.innerHTML = `<span class="list-name">Brand: </span>${product.brand}`
    listStock.innerHTML = `<span class="list-name">Stock: </span>${product.stock}`
    listPrice.innerHTML = `<span class="list-name">Price: </span>${product.price}`
    cartContainer.innerHTML = `
      <div class="input-amount">
        <div class="minus"></div>
        <input type="text" name="product-amount" value="1" class="product-amount">
        
        <div class="plus"></div>

        
      </div>
      <button class="btn-cart">ADD TO CART</button>
    `;

    cardMain.setAttribute('data-id', `${product.id}`);
    cardProduct.setAttribute('data-id', `${product.id}`);
    cardProduct.classList.add('card-product');
    cardMain.classList.add('card-main');
    cardName.classList.add('card-name');
    image.classList.add('image-product');
    list.classList.add('list');
    listCategory.classList.add('list-item');
    listBrand.classList.add('list-item');
    listStock.classList.add('list-item');
    listPrice.classList.add('list-item');
    cartContainer.classList.add('cart-container');
    
    cardProduct.append(cardName);
    cardProduct.append(image);
    list.append(listCategory);
    list.append(listBrand);
    list.append(listStock);
    list.append(listPrice);
    cardProduct.append(list);

    cardMain.append(cardProduct);
    cardMain.append(cartContainer);

    contentsContainer.append(cardMain);
  });
}

export function checkSearchParams(): void {
  const hashPageName: string = window.location.hash;
  const currentUrl: string = window.location.href;
  const url: URL = new URL(currentUrl);

  if (url.search) {
    url.searchParams.delete('id');
    window.history.replaceState({}, '', `${window.location.pathname}${hashPageName}`);
  }
}

export function getId(): string | null {
  const params = new URLSearchParams(window.location.search);
  const id: string | null = params.get('id');
  
  return id;
};

export function getPrice(id: number | undefined): string | null {
  let price = null;

  products.forEach((product: IOptionsProducts) => {
    if (product.id === id) {
      price = product.price;
    }
  });
  
  return String(price);
};
