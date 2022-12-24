import products from "../assets/json/products.json";
import { IOptionsProducts } from "./types";

export function makeCardProduct(): void {
  const contentsContainer = document.querySelector('.catalog-list') as HTMLElement;

  products.forEach((product: IOptionsProducts) => {
    const cardProduct: HTMLDivElement = document.createElement('div');
    const image: HTMLImageElement = document.createElement('img');
    image.src = product.images[0];
    image.alt = `image`;

    cardProduct.setAttribute('data-id', `${product.id}`);
    cardProduct.classList.add('card-product');
    image.classList.add('image-product');

    cardProduct.append(image);
    contentsContainer.append(cardProduct);
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
