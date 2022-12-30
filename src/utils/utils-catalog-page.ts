import products from "../assets/json/products.json";
import { IdStorage, IOptionsProducts, SortByType } from "./types";

export function makeCardProduct(arrayProducts: IOptionsProducts[]): void {
  const contentsContainer = document.querySelector('.catalog-list') as HTMLElement;

  if (contentsContainer.classList.contains('catalog-sorting-by-list')) {
    contentsContainer.classList.remove('catalog-sorting-by-list');
    //contentsContainer.innerHTML = '';
  }

  contentsContainer.innerHTML = '';

  arrayProducts.forEach((product: IOptionsProducts) => {
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
        <button class="minus"></button>
        <input type="text" name="product-amount" value="1" class="product-amount" readonly>
        <button class="plus"></button>
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

export function getQueryParam(type: string): string | null {
  const params = new URLSearchParams(window.location.search);
  const typeParam: string | null = params.get(type);
  
  return typeParam;
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

export function showAnimateImage(imageProduct: HTMLElement, imageParent: HTMLElement, state: boolean) {
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

  if (state) {
    cloneImage.animate(
      [
        { transform: `translate(0px, 0px) scale(1)` },
        { transform: `translate(${offsetX}px, -${posY}px) scale(0)` }
      ],  
      {
        duration: 1000,
      }
    );
  } else {
    cloneImage.animate(
      [
        { transform: `translate(${offsetX}px, -${posY}px) scale(0)` },
        { transform: `translate(0px, 0px) scale(1)` }
      ],  
      {
        duration: 1000,
      }
    );
  }

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

export function changeSortingByType(arrayProducts: IOptionsProducts[]): void {
  const catalogList = document.querySelector('.catalog-list') as HTMLElement;
  catalogList.classList.add('catalog-sorting-by-list');
  catalogList.innerHTML = '';

  const list: HTMLUListElement = document.createElement('ul');
  list.classList.add('sort-type-list');

  arrayProducts.forEach((product: IOptionsProducts) => {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.classList.add('sort-type-list-item');
    listItem.innerHTML = `
      <div class="list-item-container" data-id=${product.id}>
        <img src="${product.images[0]}" alt="image" class="image-sorting-by-list">
        <span class="list-item-text">${product.title}. <b>Stock</b>: ${product.stock}. <b>Price</b>: ${product.price}</span>
      </div>
      <button class="btn-cart-sort-list">ADD TO CART</button>
    `;

    list.append(listItem);
  });

  catalogList.append(list);
}

export function loadSelectedFromLocalStorage(itemContainer: NodeListOf<HTMLElement>, btnCart: NodeListOf<HTMLElement>): void {
  const sortByType: string | null = getQueryParam('type');

  if (localStorage['idProductToCart']) {
    const idProductToCart: IdStorage = JSON.parse(localStorage['idProductToCart']);
    
    products.forEach((product: IOptionsProducts, index: number) => {
      const idProduct: string = String(product.id);
      
      for (let key in idProductToCart) {
        if (key === idProduct && sortByType === SortByType.list) {
          itemContainer[index].classList.add('active-card');
          btnCart[index].innerHTML = `DROP FROM CART (${idProductToCart[key]})`;
          btnCart[index].classList.add('active-btn');
          btnCart[index].setAttribute('data-count', idProductToCart[key]);
        }

        if (key === idProduct && sortByType === SortByType.bar) {
          itemContainer[index].classList.add('active-card');
          btnCart[index].innerHTML = 'DROP FROM CART';
          btnCart[index].classList.add('active-btn');
          btnCart[index].setAttribute('data-count', idProductToCart[key]);

          const parentBtn = btnCart[index].parentElement as HTMLElement;
          const input = parentBtn.querySelector('.product-amount') as HTMLInputElement;
          input.value = idProductToCart[key];

          const minus = parentBtn.querySelector('.minus') as HTMLButtonElement;
          const plus = parentBtn.querySelector('.plus') as HTMLButtonElement;
          minus.disabled = true;
          plus.disabled = true;
        }
      }      
    });
  }
}

export function saveSelectedToLocalStorage(idProduct: string): void {
  const productAmount: string = getProductAmount(idProduct);

  if (!localStorage['idProductToCart']) {
    const idStorage: IdStorage = {};
    idStorage[idProduct] = productAmount;
    localStorage.setItem('idProductToCart', JSON.stringify(idStorage));
  } else {
    const idProductToCart: IdStorage = JSON.parse(localStorage['idProductToCart']);
    idProductToCart[idProduct] = productAmount;
    localStorage.setItem('idProductToCart', JSON.stringify(idProductToCart));
  }
}

export function removeSelectedToLocalStorage(idProduct: string): void {
  const idProductToCart: IdStorage = JSON.parse(localStorage['idProductToCart']);
  
  delete idProductToCart[idProduct];
  localStorage.setItem('idProductToCart', JSON.stringify(idProductToCart));
}

export function clearLocalStorage(): void {
  localStorage.removeItem('idProductToCart');
}

export function addQueryParam(typeSort: string, param: string): void {
  const hashPageName: string = window.location.hash;
  const params = new URLSearchParams(window.location.search);
  params.set(typeSort, param);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);
}

export function sortProducts(typeSort: string): IOptionsProducts[] {
  let resultSort: IOptionsProducts[] = [];

  switch (typeSort) {
    case SortByType.priceUp:
      resultSort = products.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    
    case SortByType.priceDown:
      resultSort = products.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    
    case SortByType.stockUp:
      resultSort = products.sort((a, b) => {
        return a.stock - b.stock;
      });
      break;

    case SortByType.stockDown:
      resultSort = products.sort((a, b) => {
        return b.stock - a.stock;
      });
      break;

    case SortByType.default:
      resultSort = products.sort((a, b) => {
        return a.id - b.id;
      });
      break;

    default:
      break;
  }


  return resultSort;
}

function getProductAmount(idProduct: string): string {
  let productAmount: string = '';
  const params = new URLSearchParams(window.location.search);

  if (params.get('type') === SortByType.bar) {
    const cardsMain = document.querySelectorAll('.card-main') as NodeListOf<HTMLElement>;
   
    for (let i = 0; i < cardsMain.length; i++) {
      if (cardsMain[i].dataset.id === idProduct) {
        const input = cardsMain[i].querySelector('.product-amount') as HTMLInputElement;
        productAmount = input.value;
      }
    }
  }

  if (params.get('type') === SortByType.list) {
    productAmount = '1';
  }

  return productAmount;
}
