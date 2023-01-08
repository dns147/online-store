import products from "../assets/json/products.json";
import { IdStorage, IOptionsProducts} from "./types";

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

export function fillProductItems(orderProducts: IOptionsProducts[], container: HTMLElement): void {
  const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
  const listProduct: HTMLUListElement = document.createElement('ul');
  listProduct.classList.add('list-product');

  orderProducts.forEach((product: IOptionsProducts, index: number) => {
    const itemProduct: HTMLLIElement = document.createElement('li');
    itemProduct.classList.add('item-product');
    const productAmountInput: string = idProducts[product.id];
    const price: number = Number(productAmountInput) * product.price;
    const stock: number = product.stock - Number(productAmountInput);

    itemProduct.innerHTML = `
      <span class="number-product">${index + 1}</span>
      <img src="${product.images[0]}" alt="image" class="item-image-product">
      <div class="item-description-container">
        <span class="name-product">${product.title}</span>
        <span class="description-product">${product.description}</span>
      </div>
      <div class="item-order-container">
        <span class="stock-product">Stock: <span class="item-stock">${stock}</span></span>
        <div class="order-product-amount">
          <button class="order-minus"></button>
          <input type="text" name="product-amount" value="${productAmountInput}" class="order-input-amount" data-id="${product.id}">
          <button class="order-plus"></button>
        </div>
        <span class="price-product">Price: <span class="item-price">${price}</span></span>
      </div>
    `;

    listProduct.append(itemProduct);
  });

  container.append(listProduct);
}