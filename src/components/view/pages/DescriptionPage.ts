import './styles/description-page.css';
import { getId } from "../../../utils/utils";
import products from "../../../assets/json/products.json";

export default class DescriptionPage {
  container: HTMLElement;
  id: string | null;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.id = null;
  }

  init(): number {
    this.id = getId();
    return this.id ? +this.id : 0;
  }

  render(): string {
    const id = this.init();
    
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
                    <span class="description-stock__heading">items in stock:</span>
                    <span class="description-stock__value">${products[id].stock}</span>
                  </div>
                  <div class="description-brand">
                    <span>brand:</span>
                    <span>${products[id].brand}</span>
                  </div>
                  <div class="description-category">
                    <span>category:</span>
                    <span>${products[id].category}</span>
                  </div>
                  <div class="description-text">
                    <h4 class="description-text__heading">description:</h4>
                    <p>${products[id].description}</p>
                  </div>
                </div>
                <div class="payment-container">
                  <span>$${products[id].price}</span>
                  <button class="btn-cart">add to cart</button>
                  <button><a href="#order">buy now</a></button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}