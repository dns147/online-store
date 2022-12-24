import { getPrice } from "../../utils/utils";
import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.updateState = this.updateState.bind(this);
    this.getEventsClick = this.getEventsClick.bind(this);

    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);  
    this.updateState();
  }

  updateState(): void {
    const that = this;
    that.model.updateState();
  }

  getEventsClick(event: Event): void {
    const that = this;
    if (event.target instanceof Element) {
      const product = event.target.closest('.card-product') as HTMLElement;
      const plus = event.target.closest('.plus') as HTMLElement;
      const minus = event.target.closest('.minus') as HTMLElement;
      const btnCart = event.target.closest('.btn-cart') as HTMLElement;

      if (product) {
        that.model.showProductDescription(product);
      }

      if (plus) {
        const parent = plus.parentElement as HTMLElement;
        const inputAmountProduct = parent.querySelector('.product-amount') as HTMLInputElement;
        that.model.plusAmountProduct(inputAmountProduct);
      }

      if (minus) {
        const parent = minus.parentElement as HTMLElement;
        const inputAmountProduct = parent.querySelector('.product-amount') as HTMLInputElement;
        that.model.minusAmountProduct(inputAmountProduct);
      }

      if (btnCart) {
        const parentBtn = btnCart.parentElement as HTMLElement;
        const parentMain = parentBtn.parentElement as HTMLElement;
        const idProduct: number | undefined = Number(parentMain.dataset.id);
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        const inputAmountProduct = parentBtn.querySelector('.product-amount') as HTMLInputElement;

        that.model.getTotalPrice(totalPrice, priceProduct, inputAmountProduct);
        that.model.addToCart(inputAmountProduct, parentMain);
      }
    }
  }
}