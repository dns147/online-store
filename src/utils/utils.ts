import products from "../assets/json/products.json";
import { IOptionsProducts, SortByType } from "./types";

export function makeCardProduct(): void {
  const contentsContainer = document.querySelector('.catalog-list') as HTMLElement;

  if (contentsContainer.classList.contains('catalog-sorting-by-list')) {
    contentsContainer.classList.remove('catalog-sorting-by-list');
    contentsContainer.innerHTML = '';
  }

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

export function checkSearchParams(searchParams: string[]): void {
  const hashPageName: string = window.location.hash;
  const params = new URLSearchParams(window.location.search);

  searchParams.forEach((param) => {
    if (params.get(param)) {
      params.delete(param);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);
    }
  });
}

export function getId(): string | null {
  const params = new URLSearchParams(window.location.search);
  const id: string | null = params.get('id');
  
  return id;
};

export function getType(): string | null {
  const params = new URLSearchParams(window.location.search);
  const type: string | null = params.get('type');
  
  return type;
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

export function showAnimateImage(imageProduct: HTMLElement, imageParent: HTMLElement) {
  const cloneImage = imageProduct.cloneNode(true) as HTMLElement;
  const params = new URLSearchParams(window.location.search);

  if (params.get('type') === SortByType.bar) {
    cloneImage.classList.add('clone-image');
  }

  if (params.get('type') === SortByType.list) {
    cloneImage.classList.add('clone-image-list');
  }

  imageParent.append(cloneImage);
  const pos: DOMRect = imageProduct.getBoundingClientRect();
  const posY: number = pos.top;
  const posX: number = pos.left;
  const widthElement: number = pos.width;
  const widthWindow: number = document.documentElement.clientWidth;
  const offsetX: number = widthWindow - posX - widthElement;

  cloneImage.animate(
    [
      { transform: `translate(0px, 0px) scale(1)` },
      { transform: `translate(${offsetX}px, -${posY}px) scale(0)` }
    ],  
    {
      duration: 1000,
    }
  );

  setTimeout(() => {
    cloneImage.remove();
  }, 900);
}

export function checkTypeOfSort(sortByType: string | null): void {
  const elemSortByBar = document.querySelector('[data-type="bar"]') as HTMLElement;
  const elemSortByList = document.querySelector('[data-type="list"]') as HTMLElement;

  if (!elemSortByList.classList.contains('sort-type-active') && sortByType === SortByType.list) {
    elemSortByList.classList.add('sort-type-active');
    elemSortByBar.classList.remove('sort-type-active');
  }

  if (!elemSortByBar.classList.contains('sort-type-active') && sortByType === SortByType.bar) {
    elemSortByBar.classList.add('sort-type-active');
    elemSortByList.classList.remove('sort-type-active');
  }
}

export function changeSortingByType(): void {
  const catalogList = document.querySelector('.catalog-list') as HTMLElement;
  catalogList.classList.add('catalog-sorting-by-list');
  catalogList.innerHTML = '';

  const list: HTMLUListElement = document.createElement('ul');
  list.classList.add('sort-type-list');

  products.forEach((product: IOptionsProducts, index: number) => {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.classList.add('sort-type-list-item');
    listItem.innerHTML = `
      <div class="list-item-container" data-id=${product.id}>
        <img src="${product.images[0]}" alt="image" class="image-sorting-by-list">
        <span class="list-item-text">${product.title}. <b>Price</b>: ${product.price}</span>
      </div>
      <button class="btn-cart-sort-list">ADD TO CART</button>
    `;

    list.append(listItem);
  });

  catalogList.append(list);
}
