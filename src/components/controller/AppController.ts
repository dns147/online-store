import { getPrice } from "../../utils/utils-catalog-page";
import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.updateStateUrl = this.updateStateUrl.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsMouseOver = this.getEventsMouseOver.bind(this);
    this.getEventsMouseOut = this.getEventsMouseOut.bind(this);
    this.getEventsChange = this.getEventsChange.bind(this);

    window.addEventListener('popstate', this.updateStateUrl);
    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('mouseover', this.getEventsMouseOver);
    document.addEventListener('mouseout', this.getEventsMouseOut);
    document.addEventListener('change', this.getEventsChange);

    this.updateState();
    this.updateStateUrl();
  }

  updateStateUrl(): void {
    const that = this;
    that.model.updateStateUrl();
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
      const logoName = event.target.closest('.logo-name') as HTMLElement;
      const order = event.target.closest('.order') as HTMLElement;
      
      if (product || listItem) {
        //window.history.replaceState({}, '', `/description`);
        that.model.showDescription(product || listItem);
      }

      if (plus) {
        const parentPlus = plus.parentElement as HTMLElement;
        const inputAmountProduct = parentPlus.querySelector('.product-amount') as HTMLInputElement;
        const parentInput = parentPlus.parentElement as HTMLElement;
        const btnCart = parentInput.querySelector('.btn-cart') as HTMLElement;
        that.model.plusAmountProduct(btnCart, inputAmountProduct);
      }

      if (minus) {
        const parentMinus = minus.parentElement as HTMLElement;
        const inputAmountProduct = parentMinus.querySelector('.product-amount') as HTMLInputElement;
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

        that.model.changeStyleCard(btnCart, imageParent, parentBtn, String(idProduct));
        that.model.getTotalPrice(btnCart, totalPrice, priceProduct, inputAmountProduct);
        that.model.addToCart(btnCart, imageProduct, imageParent, inputAmountProduct);
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
        
        that.model.changeStyleCard(btnCartSortList, listItemContainer, parentBtn, String(idProduct));
        that.model.getTotalPrice(btnCartSortList, totalPrice, priceProduct);
        that.model.addToCart(btnCartSortList, imageProduct, listItemContainer);
      }

      if (logoName) {
        //that.model.setDefaultParams();
        window.history.replaceState({}, '', `/`);
      }

      if (order) {
        window.history.replaceState({}, '', `/`);
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

  getEventsChange(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const select = event.target.closest('.search-select') as HTMLInputElement;

      if (select) {
        event.preventDefault();
        that.model.clickSelect(select);
      }
    }
  }
}