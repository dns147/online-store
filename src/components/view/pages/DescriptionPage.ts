import './styles/description-page.css';
import products from '../../../assets/json/products.json';
import { getId } from '../../../utils/utils-catalog-page';
import { checkFromLocalStorage } from '../../../utils/utils-description-page';

export default class DescriptionPage {
  container: HTMLElement;
  id: string | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.id = null;
  }

  init(): void {
    this.id = getId();
    checkFromLocalStorage(this.id);

    if (localStorage['totalPrice']) {
      (document.querySelector('.total-price') as HTMLElement).innerHTML = localStorage['totalPrice'];
    }

    if (localStorage['countBuy']) {
      (document.querySelector('.count-buy') as HTMLElement).innerHTML = localStorage['countBuy'];
    }
  }

  render(): string {
    const id: number = Number(getId()) ?? 0;

    return `
      <div class="description-wrapper">
       <div class="product-picture-popup"></div>
        <section class="breadcrumbs">
          <div class="breadcrumbs-container">
            <a class="breadcrumbs-container__link" href="#catalog">store</a>
            <img src="https://i.ibb.co/b2bmx56/falcon1.png" alt="">
            <span>${products[id].category}</span>
            <img src="https://i.ibb.co/b2bmx56/falcon1.png" alt="">
            <span>${products[id].brand}</span>
            <img src="https://i.ibb.co/b2bmx56/falcon1.png" alt="">
            <span>${products[id].title}</span>
          </div>
        </section>
        <section class="product-info">
          <div class="product-info-container">
            <h3 class="product-title-container">${products[id].title}</h3>
              <div class="product-info-details">
                <div class="product-info-pictures">
                  <div class="product-info-pictures-additional">
                    <div class="product-info-pictures-item">
                      <img class="description-img" src="${products[id].images[1]}" alt="">
                    </div>
                  </div>
                  <div class="product-info-pictures-main">
                    <img class="description-img" src="${products[id].images[0]}" alt="">
                  </div>
                </div>
                <div class="description-container">
                  <div class="description-stock">
                    <span class="description-stock__heading">Items in stock:</span>
                    <span class="description-stock__value">${products[id].stock}</span>
                  </div>
                  <div class="description-brand">
                    <span class="description-stock__heading">Brand:</span>
                    <span>${products[id].brand}</span>
                  </div>
                  <div class="description-category">
                    <span class="description-stock__heading">Category:</span>
                    <span>${products[id].category}</span>
                  </div>
                  <div class="description-text">
                    <h4 class="description-text__heading">Description:</h4>
                    <p>${products[id].description}</p>
                  </div>
                </div>
                <div class="payment-container">
                  <span>$${products[id].price}</span>
                  <button class="btn-cart-description">add to cart</button>
                  <button class="buy-cart"><a href="#order">buy now</a></button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
