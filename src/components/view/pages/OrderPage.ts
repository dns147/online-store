import './styles/order-page.css';
import { IdStorage, IOptionsProducts } from "../../../utils/types";
import { deleteSearchParams } from "../../../utils/utils-catalog-page";
import { fillProductItems, getOrderProducts } from "../../../utils/utils-order-page";

export default class OrderPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): string {
    return `
      <article class="main-cart-container">
        <div class="product-in-cart">
          <div class="title-and-page-control">
            <h2 class="header-name">Products In Cart</h2>
            <div class="page-control">
              <div class="limit"> 
                <span>LIMIT: </span> 
                <input type="number" value="1" min="1" max="99" class="limit-input">
              </div>
              <div class="page-numbers">
                <span>PAGE: </span>
                <button class="page-left"> &lt; </button>
                <span>1</span>
                <button class="page-right"> &gt; </button>
              </div>
            </div>
          </div>
          <div class="product-items"></div>
        </div>
        <div class="total-cart">
          <h2 class="header-name">Summary</h2>
          <div class="total-cart-container">
            <div class="total-number">
              <span>Products:</span>
              <span class="order-total-number">10</span>
            </div>
            <div class="order-total-price">
              <span>Total price:</span>
              <span class="count-total-price">10</span>
            </div>
            <form class="promo-code">
              <input type="search" placeholder="Enter promo code" class="promo-code-input">
            </form>
            <span class="promo-ex">Promo for test: 'RS', 'EPM'</span>
            <button class="order-btn-buy">BUY NOW</button>
          </div>
        </div>
      </article>
    `;
  }

  init(): void {
    deleteSearchParams(['id', 'sort']);

    if (localStorage['idProductToCart']) {
      const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
      const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);

      const productItemsContainer = this.container.querySelector('.product-items') as HTMLElement;
      fillProductItems(orderProducts, productItemsContainer);
    }
    

    if (localStorage['totalPrice']) {
      (document.querySelector('.total-price') as HTMLElement).innerHTML = localStorage['totalPrice'];
    }

    if (localStorage['countBuy']) {
      (document.querySelector('.count-buy') as HTMLElement).innerHTML = localStorage['countBuy'];
    }
  }
}