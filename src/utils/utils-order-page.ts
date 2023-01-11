import products from "../assets/json/products.json";
import { IdStorage, IOptionsProducts} from "./types";
import { setQueryParam } from "./utils-catalog-page";

export function getOrderProducts(idProducts: IdStorage): IOptionsProducts[] {
  let orderProducts: IOptionsProducts[] = [];

  for (let id in idProducts) {
    orderProducts.push(... products.filter((product: IOptionsProducts) => product.id === Number(id)));
  }

  return orderProducts;
}

export function getStock(id: number | undefined): string | null {
  let stock = null;

  products.forEach((product: IOptionsProducts) => {
    if (product.id === id) {
      stock = product.stock;
    }
  });
  
  return String(stock);
};

export function fillProductItems(orderProducts: IOptionsProducts[], container: HTMLElement, limitPage: number, startIndex: number, statePageUp: boolean): void {
  const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
  const listProduct: HTMLUListElement = document.createElement('ul');
  listProduct.classList.add('list-product');
  let endIndex: number = 0;

  if (localStorage['startIndex'] && statePageUp) {
    const middle: number = orderProducts.length - Number(localStorage['startIndex']);

    if (Number(localStorage['startIndex']) > middle && limitPage > 2) {
      endIndex = Number(localStorage['startIndex']) + middle;
    } else {
      endIndex = startIndex + limitPage;
    }
  } else {
    endIndex = startIndex + limitPage;
  }

  if (!statePageUp) {
    endIndex = startIndex + limitPage;
  }

  localStorage.setItem('startIndex', String(endIndex));

  if (Object.keys(idProducts).length !== 0) {
    for (let index = startIndex; index < endIndex; index += 1) {
      const itemProduct: HTMLLIElement = document.createElement('li');
      itemProduct.classList.add('item-product');
      const productAmountInput: string = idProducts[orderProducts[index].id];
      const price: number = Number(productAmountInput) * orderProducts[index].price;
      const stock: number = orderProducts[index].stock - Number(productAmountInput);

      itemProduct.innerHTML = `
        <span class="number-product">${index + 1}</span>
        <img src="${orderProducts[index].images[0]}" alt="image" class="item-image-product">
        <div class="item-description-container">
          <span class="name-product">${orderProducts[index].title}</span>
          <span class="description-product">${orderProducts[index].description}</span>
        </div>
        <div class="item-order-container">
          <span class="stock-product">Stock: <span class="item-stock">${stock}</span></span>
          <div class="order-product-amount">
            <button class="order-minus"></button>
            <input type="text" name="product-amount" value="${productAmountInput}" class="order-input-amount" data-id="${orderProducts[index].id}" readonly>
            <button class="order-plus"></button>
          </div>
          <span class="price-product">Price: $<span class="item-price">${price}</span></span>
        </div>
      `;

      listProduct.append(itemProduct);
    }
  }

  container.append(listProduct);
}

export function changeProductInPage(limitPage: number, startIndex: number, statePageUp: boolean): void {
  const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
  const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);
  const productItemsContainer = document.querySelector('.product-items') as HTMLElement;
  productItemsContainer.innerHTML = '';
  fillProductItems(orderProducts, productItemsContainer, limitPage, startIndex, statePageUp);
}

export function addLimitPage(limitPage: number, statePageUp: boolean): void {
  setQueryParam('limit', String(limitPage));
  localStorage.setItem('limit', String(limitPage));

  const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
  const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);
  const elemSummaryPage = document.querySelector('.summary-page') as HTMLElement;
  const summaryPage: number = Math.ceil(orderProducts.length / limitPage);
  const resultSummaryPage: number = (isFinite(summaryPage)) ? summaryPage : orderProducts.length;
  
  elemSummaryPage.innerHTML = String(resultSummaryPage);
  setQueryParam('pages', String(resultSummaryPage));
  localStorage.setItem('summaryPage', String(resultSummaryPage));

  const startIndex: number = 0;
  changeProductInPage(limitPage, startIndex, statePageUp);
}
