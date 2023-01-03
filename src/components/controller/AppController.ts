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
      const btnCart = event.target.closest('.btn-cart') as HTMLElement;
      const btnSortType = event.target.closest('.sort-type') as HTMLElement;
      const listItem = event.target.closest('.list-item-container') as HTMLElement;
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLElement;


      // for description page
      const productPic = event.target.closest('.product-info-pictures-main') as HTMLElement;
      const descriptionPopup = event.target.closest('.product-picture-popup') as HTMLElement;
      const productAdPic = event.target.closest('.product-info-pictures-item') as HTMLElement
      if (productPic) {
        const popup = document.querySelector('.product-picture-popup') as HTMLElement;
        const pic = productPic.firstElementChild as HTMLElement;
        const clone = pic.cloneNode() as HTMLElement;

        popup.innerHTML = '';

        clone.classList.remove('description-img');
        clone.classList.add('product-picture-popup__img');
        
        popup.append(clone);
        popup.classList.add('product-picture-popup_open');
      }
      if(descriptionPopup) {
        descriptionPopup.classList.remove('product-picture-popup_open');
      }
      if(productAdPic) {
        const pic = productAdPic.firstElementChild as HTMLImageElement;
        const mainPic = document.querySelector('.product-info-pictures-main .description-img') as HTMLImageElement;
        const srcForMain = pic.src;

        pic.src = mainPic.src;
        mainPic.src = srcForMain;
      }
      // for description page

      
      if (product || listItem) {
        that.model.showProductDescription(product || listItem);
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

        const imageProduct = parentMain.querySelector('.image-product') as HTMLElement;
        const imageParent = parentMain.querySelector('.card-product') as HTMLElement;

        that.model.getTotalPrice(totalPrice, priceProduct, inputAmountProduct);
        that.model.addToCart(imageProduct, imageParent, inputAmountProduct);
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
        
        that.model.getTotalPrice(totalPrice, priceProduct);
        that.model.addToCart(imageProduct, listItemContainer);
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