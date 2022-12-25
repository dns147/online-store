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
    this.getEventsMouseOver = this.getEventsMouseOver.bind(this);
    this.getEventsMouseOut = this.getEventsMouseOut.bind(this);

    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('mouseover', this.getEventsMouseOver);
    document.addEventListener('mouseout', this.getEventsMouseOut);

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
      const btnCart = event.target.closest('.btn-cart') as HTMLButtonElement;
      const btnSortType = event.target.closest('.sort-type') as HTMLElement;
      const listItem = event.target.closest('.list-item-container') as HTMLElement;
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLButtonElement;
      
      if (product || listItem) {
        that.model.showProductDescription(product || listItem);
      }

      if (plus) {
        const parent = plus.parentElement as HTMLElement;
        const inputAmountProduct = parent.querySelector('.product-amount') as HTMLInputElement;
        const btnCart = document.querySelector('.btn-cart') as HTMLElement;

        that.model.plusAmountProduct(btnCart, inputAmountProduct);
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

        const imageProduct = parentMain.querySelector('.image-product') as HTMLElement;
        const imageParent = parentMain.querySelector('.card-product') as HTMLElement;

        that.model.changeStyleCard(btnCart, imageParent, parentBtn);
        that.model.getTotalPrice(btnCart, totalPrice, priceProduct, inputAmountProduct);
        that.model.addToCart(btnCart, imageProduct, imageParent, inputAmountProduct);
        that.model.saveIdProduct(String(idProduct));
      }

      if (btnSortType) {
        that.model.changeSortByType(btnSortType);
      }

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        const idProduct: number | undefined = Number(listItemContainer.dataset.id);
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        const imageProduct = listItemContainer.querySelector('.image-sorting-by-list') as HTMLElement;
        
        that.model.changeStyleCard(btnCartSortList, listItemContainer, parentBtn);
        that.model.getTotalPrice(btnCartSortList, totalPrice, priceProduct);
        that.model.addToCart(btnCartSortList, imageProduct, listItemContainer);
        that.model.saveIdProduct(String(idProduct));
      }
    }
  }

  getEventsMouseOver(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLElement;

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        that.model.addStyleBtn(listItemContainer);
      }
    }
  }

  getEventsMouseOut(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLElement;

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        that.model.removeStyleBtn(listItemContainer);
      }
    }
  }
}