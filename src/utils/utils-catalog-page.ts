import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';
import products from "../assets/json/products.json";
import { DataCategories, IdStorage, IOptionsProducts, SortByType } from "./types";

export function addFilterCategory(container: HTMLElement, nameItem: string): void {
  const dataCategories: DataCategories = getDataCategories(nameItem);
  let index: number = 1;

  for (let key in dataCategories) {
    const categoryItem: HTMLDivElement = document.createElement('div');
    const categoryItemDiv: HTMLDivElement = document.createElement('div');
    const input: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const name = document.createElement('span');
    const numberCategory = document.createElement('span');

    categoryItem.classList.add(`${nameItem}-item`);
    input.type = 'checkbox';
    input.name = key;
    input.id = `${nameItem}${index}`;
    input.classList.add(`${nameItem}${index}`, `${nameItem}-input`);
    name.innerHTML = key;
    name.classList.add(`${nameItem}-name`);
    label.classList.add('label');
    label.setAttribute('for', `${nameItem}${index}`);
    numberCategory.innerHTML = `(<span class="${nameItem}${index}-find-count">${dataCategories[key]}</span>/<span class="${nameItem}${index}-full-count">${dataCategories[key]}</span>)`;
    index += 1;

    categoryItemDiv.append(input);
    categoryItemDiv.append(name);
    categoryItemDiv.append(label);
    categoryItem.append(categoryItemDiv);
    categoryItem.append(numberCategory);

    container.append(categoryItem);
  }
}

export function makeCardProduct(arrayProducts: IOptionsProducts[]): void {
  const contentsContainer = document.querySelector('.catalog-list') as HTMLElement;

  if (contentsContainer.classList.contains('catalog-sorting-by-list')) {
    contentsContainer.classList.remove('catalog-sorting-by-list');
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

    cardAnimate(cardMain); 

    contentsContainer.append(cardMain);
  });
}

export function deleteSearchParams(searchParams: string[]): void {
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
  // const params = new URLSearchParams(window.location.search);
  // const id: string | null = params.get('id');

  const fullPathName: string = window.location.pathname;
  const fullPathNameArr: string[] = fullPathName.split('/');
  const id: string | null = fullPathNameArr[2];
  
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

  if (!params.get('type') || (params.get('type') === SortByType.bar)) {
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

export function showSortProductBarView(classForSearch: string, typeOfSort: string): void {
  const option = document.querySelector(classForSearch) as HTMLOptionElement;
  option.selected = true;

  const sortCatalog: IOptionsProducts[] = sortProducts(typeOfSort);
  makeCardProduct(sortCatalog);

  const itemContainer = document.querySelectorAll('.card-product') as NodeListOf<HTMLElement>;
  const btnCart = document.querySelectorAll('.btn-cart') as NodeListOf<HTMLElement>;
  loadSelectedFromLocalStorage(itemContainer, btnCart);
}

export function showSortProductListView(classForSearch: string, typeOfSort: string): void {
  const option = document.querySelector(classForSearch) as HTMLOptionElement;
  option.selected = true;

  const sortCatalog: IOptionsProducts[] = sortProducts(typeOfSort);
  changeSortingByType(sortCatalog);

  const listItemContainer = document.querySelectorAll('.list-item-container') as NodeListOf<HTMLElement>;
  const btnCartSortList = document.querySelectorAll('.btn-cart-sort-list') as NodeListOf<HTMLElement>;
  loadSelectedFromLocalStorage(listItemContainer, btnCartSortList);
}

export function searchProducts(valueInput: string): IOptionsProducts[] {
  const valueInputLowerCase: string =  valueInput.toLowerCase();
  let resultSearch: IOptionsProducts[] = [];

  products.forEach((item: IOptionsProducts) => {
    const title: string =  item.title.toLowerCase();
    const description: string =  item.description.toLowerCase();
    const price: string =  String(item.price);
    const stock: string =  String(item.stock);
    const brand: string =  item.brand.toLowerCase();
    const category: string =  item.category.toLowerCase();

    if (title.includes(valueInputLowerCase) ||
        description.includes(valueInputLowerCase) ||
        price.includes(valueInputLowerCase) ||
        stock.includes(valueInputLowerCase) ||
        brand.includes(valueInputLowerCase) ||
        category.includes(valueInputLowerCase)) {
      resultSearch.push(item);
    }
  });

  return resultSearch;
}

export function sortingCatalog(categoryName: string, name: string): IOptionsProducts[] {
  let resultSearch: IOptionsProducts[] = [];
  
  if (name === 'category') {
    resultSearch = products.filter((item: IOptionsProducts) => item.category === categoryName);
  }

  if (name === 'brand') {
    resultSearch = products.filter((item: IOptionsProducts) => item.brand === categoryName);
  }
  
  return resultSearch;
}

export function clickSearchProducts(valueInput: string): void {
  const view = getQueryParam('type');
  const searchCatalog: IOptionsProducts[] = searchProducts(valueInput);
  const foundCount = document.querySelector('.found-count') as HTMLElement;

  foundCount.innerHTML = String(searchCatalog.length);

  if (view === SortByType.list) {
    changeSortingByType(searchCatalog);
  }

  if (!view || (view === SortByType.bar)) {
    makeCardProduct(searchCatalog);
  }
}

export function makePriceSlider(priceSlider: HTMLElement): void {
  noUiSlider.create(priceSlider, {
    start: [5, 65],
    connect: true,
    tooltips: [true, true],
    step: 1,
    range: {
        'min': 5,
        'max': 65
    },
    format: wNumb({
        decimals: 0
    }),
  });
}

export function makeStockSlider(stockSlider: HTMLElement): void {
  noUiSlider.create(stockSlider, {
    start: [1, 44],
    connect: true,
    tooltips: [true, true],
    step: 1,
    range: {
        'min': 1,
        'max': 44
    },
    format: wNumb({
        decimals: 0
    }),
  });
}

function getDataCategories(name: string): DataCategories {
  const dataCatogories: DataCategories = {};
  const fullCategories: string[] = [];

  products.forEach((item: IOptionsProducts) => {
    if (name === 'category') {
      fullCategories.push(item.category);
    }

    if (name === 'brand') {
      fullCategories.push(item.brand);
    }
  });

  const categories: Set<string> = new Set(fullCategories);

  categories.forEach((categoryName: string) => {
    let sumCategory = 0;

    fullCategories.forEach((itemCategory: string) => {
      if (categoryName === itemCategory) {
        sumCategory += 1;
      }
    });

    dataCatogories[categoryName] = sumCategory;
  });

  return dataCatogories;
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

  if (!params.get('type') || (params.get('type') === SortByType.list)) {
    productAmount = '1';
  }

  return productAmount;
}

function cardAnimate(item: HTMLDivElement): void {
  item.animate(
    [
      { transform: `translate(300px, 300px) scale(0.1, 0.1)` },
      { transform: 'none' },
    ],
    {
      duration: 600,
      easing: 'ease-out',
    }
  );
}
