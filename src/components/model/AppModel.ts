import AppView from "../view/AppView";
import products from "../../assets/json/products.json";
import { showAnimateImage } from "../../utils/utils";
import { IdStorage } from "../../utils/types";

export default class AppModel {
  view: AppView;

  constructor(view: AppView) {
    this.view = view;
  }

  updateState(): void {
    const hashPageName: string = window.location.hash.slice(1);
    this.view.renderContent(hashPageName);
  }

  showProductDescription(element: HTMLElement): void {
    const id: string | undefined = element.dataset.id;
    const params = new URLSearchParams(window.location.search);

    params.set('id', `${id}`);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    window.location.hash = 'description';
  }

  plusAmountProduct(btnCart: HTMLElement, input: HTMLInputElement): void {
    const value: number = Number(input.value);

    if (!btnCart.classList.contains('active-btn')) {
      input.value = String(value + 1);
    }
  }

  minusAmountProduct(input: HTMLInputElement): void {
    const value: number = Number(input.value);

    if (value > 1) {
      input.value = String(value - 1);
    }
  }

  changeStyleCard(btnCart: HTMLButtonElement, imageParent: HTMLElement, parentBtn: HTMLElement, idProduct: string): void {
    this.view.changeStyleCard(btnCart, imageParent, parentBtn, idProduct);
  }

  getTotalPrice(btnCart: HTMLButtonElement, totalPrice: HTMLElement, priceProduct: string | null, input?: HTMLInputElement): void {
    const price: number = Number(priceProduct);
    const currentTotalPrice: number = Number(totalPrice.innerHTML);
    const countProduct: number = Number(input?.value);
    const savedCountProduct: number = Number(btnCart.dataset.count);
    let newTotalPrice: string = '';

    if (input && btnCart.classList.contains('active-btn')) {
      newTotalPrice = String(currentTotalPrice + countProduct * price);
    } else if (!input && btnCart.classList.contains('active-btn')) {
      newTotalPrice = String(currentTotalPrice + price);
    }

    if (input && !btnCart.classList.contains('active-btn')) {
      newTotalPrice = String(currentTotalPrice - countProduct * price);
    } else if (!input && !btnCart.classList.contains('active-btn')) {
      newTotalPrice = String(currentTotalPrice - savedCountProduct * price);
    }

    this.view.showNewTotalPrice(totalPrice, newTotalPrice);
  }

  addToCart(btnCart: HTMLButtonElement, imageProduct: HTMLElement, imageParent: HTMLElement, input?: HTMLInputElement): void {
    const countProduct: number = Number(input?.value);
    btnCart.disabled = true;
    const savedCountProduct = Number(btnCart.dataset?.count) ? Number(btnCart.dataset?.count) : 1;

    if (input) {
      setTimeout(() => {
        this.view.addToCart(btnCart, countProduct);
        btnCart.disabled = false;
      }, 900);
    } else {
      setTimeout(() => {
        this.view.addToCart(btnCart, savedCountProduct);
        btnCart.disabled = false;
      }, 900);
    }

    if (!btnCart.classList.contains('active-btn')) {
      showAnimateImage(imageProduct, imageParent, false);
    } else {
      showAnimateImage(imageProduct, imageParent, true);
    }
  }

  changeSortByType(btnSortType: HTMLElement):void {
    const typeOfSort: string | undefined = btnSortType.dataset.type;

    this.view.changeSortByType(btnSortType, typeOfSort);
  }

  addStyleBtn(listItemContainer: HTMLElement): void {
    this.view.addStyleBtn(listItemContainer);
  }

  removeStyleBtn(listItemContainer: HTMLElement): void {
    this.view.removeStyleBtn(listItemContainer);
  }
}