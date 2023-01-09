import './styles/order-page.css';
import './styles/popup-order.css';
import { IdStorage, IOptionsProducts } from "../../../utils/types";
import { deleteSearchParams, getQueryParam, setQueryParam } from "../../../utils/utils-catalog-page";
import { fillProductItems, getOrderProducts } from "../../../utils/utils-order-page";

export default class OrderPage {
  container: HTMLElement;
  popup: string | null;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.popup = null;
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
                <span class="count-page">1</span>
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
              <span class="order-total-number">0</span>
            </div>
            <div class="order-total-price">
              <span>Total price: $</span><span class="count-total-price">0</span>
            </div>
            <form class="promo-code">
              <input type="search" placeholder="Enter promo code" class="promo-code-input">
            </form>
            <span class="promo-ex">Promo for test: 'RS', 'EPM'</span>
            <button class="order-btn-buy">BUY NOW</button>
          </div>
        </div>

        <div class="popup-order">
          <div class="popup-wrapper">
            <div class="form-container">
              <form class="order-form">
                <div class="order-form__personal-data">
                  <div class="order-form__name-container">
                    <input class="order-form__name order-input" type="text" placeholder="Name and Surname" title="at least 2 words in English(3 characters each)">
                  </div>
                  <div class="order-form__tel-container">
                    <input class="order-form__tel order-input" type="tel" placeholder="Phone number" title="begins with '+', at least 9 digits">
                  </div>
                  <div class="order-form__address-container">
                    <input class="order-form__address order-input" type="text" placeholder="Delivery adress" title="at least 3 words in English(5 characters each)">
                  </div>
                  <div class="order-form__email-container">
                    <input class="order-form__email order-input" type="email" placeholder="Email xxxxx@xxxxx.xxx">
                  </div>
                </div>
                <div class="order-form__card-data">
                  <h3 class="order-form__card-heading">imperial bank</h3>
                  <div class="order-form__payment-info">
                    <div class="order-form__payment-system">
                      <img class="order-form__payment-img" src="" alt=""></img>
                    </div>
                    <div class="order-form__card-number">
                      <input class="order-form__card first-numbers order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                    </div>
                  </div>
                  <div class="order-form__card-info">
                    <div class="order-form__valid-container">
                      <label class="order-form__valid-text" for="valid">
                      <span>valid</span><span>thru</span>
                      </label>
                      <input id="valid" class="order-form__valid order-input" type="text" placeholder="00/00" pattern="[0-1]{1}[0-9]{1}/[0-9]{2}">
                    </div>
                    <div class="order-form__cvv-container">
                      <label class="order-form__cvv-text" for="cvv">cvv</label>
                      <input id="cvv" class="order-form__cvv order-input" type="number" placeholder="000" pattern="[0-9]{3}">
                    </div>
                  </div>
                </div>
                <button class="order-form__button" type="submit">confirm</button>
              </form>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  init(): void {
    deleteSearchParams(['id', 'sort']);
    this.popup = getQueryParam('popup');

    const limitPageInput = document.querySelector('.limit-input') as HTMLInputElement;
    const limitPage = Number(limitPageInput.value);
    setQueryParam('limit', String(limitPage));
    setQueryParam('page', String(1));

    if (localStorage['idProductToCart']) {
      const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
      const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);

      const productItemsContainer = this.container.querySelector('.product-items') as HTMLElement;
      fillProductItems(orderProducts, productItemsContainer, limitPage);
    }
    
    if (localStorage['totalPrice']) {
      (document.querySelector('.total-price') as HTMLElement).innerHTML = localStorage['totalPrice'];
      (document.querySelector('.count-total-price') as HTMLElement).innerHTML = localStorage['totalPrice'];
    }

    if (localStorage['countBuy']) {
      (document.querySelector('.count-buy') as HTMLElement).innerHTML = localStorage['countBuy'];
      (document.querySelector('.order-total-number') as HTMLElement).innerHTML = localStorage['countBuy'];
    }

    if (this.popup === 'true') {
      const popup = document.querySelector('.popup-order') as HTMLElement;
      popup.classList.add('active-popup');
    }
  }
}