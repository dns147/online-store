import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { GetResult } from '../../utils/types';
import { getId, getPrice } from "../../utils/utils-catalog-page";
import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    //this.updateStateUrl = this.updateStateUrl.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsMouseOver = this.getEventsMouseOver.bind(this);
    this.getEventsMouseOut = this.getEventsMouseOut.bind(this);
    this.getEventsChange = this.getEventsChange.bind(this);
    this.getEventsInput = this.getEventsInput.bind(this);

    //window.addEventListener('popstate', this.updateStateUrl);
    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('mouseover', this.getEventsMouseOver);
    document.addEventListener('mouseout', this.getEventsMouseOut);
    document.addEventListener('change', this.getEventsChange);
    document.addEventListener('input', this.getEventsInput);

    this.updateState();
    //this.updateStateUrl();
  }

  // updateStateUrl(): void {
  //   const that = this;
  //   that.model.updateStateUrl();
  // }

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
      const btnViewType = event.target.closest('.sort-type') as HTMLElement;
      const listItem = event.target.closest('.list-item-container') as HTMLElement;
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLButtonElement;
      // const logoName = event.target.closest('.logo-name') as HTMLElement;
      // const order = event.target.closest('.order') as HTMLElement;
      const btnReset = event.target.closest('.reset') as HTMLButtonElement;
      const btnCopy = event.target.closest('.copy') as HTMLButtonElement;
      const priceSlider = event.target.closest('.price-slider') as noUiSlider.target;
      const stockSlider = event.target.closest('.stock-slider') as noUiSlider.target;

      // for description page
      const productPic = event.target.closest('.product-info-pictures-main') as HTMLElement;
      const descriptionPopup = event.target.closest('.product-picture-popup') as HTMLElement;
      const productAdPic = event.target.closest('.product-info-pictures-item') as HTMLElement
      const btnCartDescription = event.target.closest('.btn-cart-description') as HTMLButtonElement;
      
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

      if (descriptionPopup) {
        descriptionPopup.classList.remove('product-picture-popup_open');
      }
      
      if (productAdPic) {
        const pic = productAdPic.firstElementChild as HTMLImageElement;
        const mainPic = document.querySelector('.product-info-pictures-main .description-img') as HTMLImageElement;
        const srcForMain = pic.src;

        pic.src = mainPic.src;
        mainPic.src = srcForMain;
      }

      if (btnCartDescription) {
        const idProduct: number | undefined = Number(getId());
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        
        that.model.changeStyleBtnCartDescription(btnCartDescription, String(idProduct));
        that.model.getTotalPrice(btnCartDescription, totalPrice, priceProduct);
        that.model.addToCartFromDescription(btnCartDescription);
      }
      // for description page
      
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

      if (btnViewType) {
        that.model.changeViewType(btnViewType);
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

      if (btnReset) {
        that.model.resetFilters();
      }

      if (btnCopy) {
        that.model.copyUrlToBuffer();
      }

      if (priceSlider) {
        this.model.sortSlider(priceSlider, 'price');
      }

      if (stockSlider) {
        this.model.sortSlider(stockSlider, 'stock');
      }

      //if (logoName) {
        //that.model.setDefaultParams();
        //window.history.replaceState({}, '', '/');
      //}

      //if (order) {
        //window.history.replaceState({}, '', '/');
      //}
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
      const category1 = event.target.closest('.category1') as HTMLInputElement;
      const category2 = event.target.closest('.category2') as HTMLInputElement;
      const category3 = event.target.closest('.category3') as HTMLInputElement;
      const category4 = event.target.closest('.category4') as HTMLInputElement;

      const brand1 = event.target.closest('.brand1') as HTMLInputElement;
      const brand2 = event.target.closest('.brand2') as HTMLInputElement;
      const brand3 = event.target.closest('.brand3') as HTMLInputElement;
      const brand4 = event.target.closest('.brand4') as HTMLInputElement;

      if (select) {
        event.preventDefault();
        that.model.clickSelect(select);
      }

      if (category1) {
        if (category1.checked) {
          that.model.sortCategory(category1, 'category');
          that.model.checkOtherCategory(category1, 'category');
        } else {
          that.model.unSortCategory(category1, 'category');
          that.model.resetOtherCategory(category1, 'category');
        }
      }

      if (category2) {
        if (category2.checked) {
          that.model.sortCategory(category2, 'category');
          that.model.checkOtherCategory(category2, 'category');
        } else {
          that.model.unSortCategory(category2, 'category');
          that.model.resetOtherCategory(category2, 'category');
        }
      }

      if (category3) {
        if (category3.checked) {
          that.model.sortCategory(category3, 'category');
          that.model.checkOtherCategory(category3, 'category');
        } else {
          that.model.unSortCategory(category3, 'category');
          that.model.resetOtherCategory(category3, 'category');
        }
      }

      if (category4) {
        if (category4.checked) {
          that.model.sortCategory(category4, 'category');
          that.model.checkOtherCategory(category4, 'category');
        } else {
          that.model.unSortCategory(category4, 'category');
          that.model.resetOtherCategory(category4, 'category');
        }
      }

      if (brand1) {
        if (brand1.checked) {
          that.model.sortCategory(brand1, 'brand');
          that.model.checkOtherCategory(brand1, 'brand');
        } else {
          that.model.unSortCategory(brand1, 'brand');
          that.model.resetOtherCategory(brand1, 'brand');
        }
      }

      if (brand2) {
        if (brand2.checked) {
          that.model.sortCategory(brand2, 'brand');
          that.model.checkOtherCategory(brand2, 'brand');
        } else {
          that.model.unSortCategory(brand2, 'brand');
          that.model.resetOtherCategory(brand2, 'brand');
        }
      }

      if (brand3) {
        if (brand3.checked) {
          that.model.sortCategory(brand3, 'brand');
          that.model.checkOtherCategory(brand3, 'brand');
        } else {
          that.model.unSortCategory(brand3, 'brand');
          that.model.resetOtherCategory(brand3, 'brand');
        }
      }

      if (brand4) {
        if (brand4.checked) {
          that.model.sortCategory(brand4, 'brand');
          that.model.checkOtherCategory(brand4, 'brand');
        } else {
          that.model.unSortCategory(brand4, 'brand');
          that.model.resetOtherCategory(brand4, 'brand');
        }
      }
    }
  }

  getEventsInput(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const search = event.target.closest('.search-input') as HTMLInputElement;

      if (search) {
        event.preventDefault();
        that.model.clickSearch();
      }
    }
  }
}