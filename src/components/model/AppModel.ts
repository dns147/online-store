import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import AppView from '../view/AppView';
import {
  setQueryParam,
  getDataCategories,
  showAnimateImage,
  sortingCatalog,
  checkOtherCategory,
  deleteSearchParams,
  getPrice,
  getQueryParam,
  saveSelectedToLocalStorage,
} from '../../utils/utils-catalog-page';
import { DataCategories, GetResult, IdStorage, IOptionsProducts, PromoCode } from '../../utils/types';
import { getStock } from '../../utils/utils-order-page';

export default class AppModel {
  view: AppView;
  hashPageName: string;

  constructor(view: AppView) {
    this.view = view;
    this.hashPageName = '';
  }

  updateState(): void {
    const hashPageName: string = window.location.hash.slice(1);
    this.hashPageName = hashPageName;
    this.view.renderContent(hashPageName);
  }

  showDescription(element: HTMLElement): void {
    const id: string | undefined = element.dataset.id;

    if (id) {
      setQueryParam('id', id);
    }

    window.location.hash = 'description';
  }

  plusAmountProduct(btnCart: HTMLElement, input: HTMLInputElement, cardMain: HTMLElement): void {
    const value = Number(input.value);
    const id = Number(cardMain.dataset.id);
    const stock = Number(getStock(id));
    const newValue: number = value + 1 > stock ? stock : value + 1;

    if (!btnCart.classList.contains('active-btn')) {
      input.value = String(newValue);
    }
  }

  minusAmountProduct(input: HTMLInputElement): void {
    const value = Number(input.value);

    if (value > 1) {
      input.value = String(value - 1);
    }
  }

  changeStyleCard(
    btnCart: HTMLButtonElement,
    imageParent: HTMLElement,
    parentBtn: HTMLElement,
    idProduct: string
  ): void {
    this.view.changeStyleCard(btnCart, imageParent, parentBtn, idProduct);
  }

  changeStyleBtnCartDescription(btnCart: HTMLButtonElement, idProduct: string): void {
    this.view.changeStyleBtnCartDescription(btnCart, idProduct);
  }

  getTotalPrice(
    btnCart: HTMLButtonElement,
    totalPrice: HTMLElement,
    priceProduct: string | null,
    input?: HTMLInputElement
  ): void {
    const price = Number(priceProduct);
    const currentTotalPrice = Number(totalPrice.innerHTML);
    const countProduct = Number(input?.value);
    const savedCountProduct = Number(btnCart.dataset.count ?? 1);
    let newTotalPrice = '';

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

  addToCart(
    btnCart: HTMLButtonElement,
    imageProduct: HTMLElement,
    imageParent: HTMLElement,
    input?: HTMLInputElement
  ): void {
    const countProduct = Number(input?.value);
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

  addToCartFromDescription(btnCart: HTMLButtonElement): void {
    const savedCountProduct = Number(btnCart.dataset?.count) ? Number(btnCart.dataset?.count) : 1;
    this.view.addToCart(btnCart, savedCountProduct);
  }

  changeViewType(btnViewType: HTMLElement): void {
    const typeOfView: string | undefined = btnViewType.dataset.type;
    this.view.changeViewType(btnViewType, typeOfView);
  }

  addStyleBtn(listItemContainer: HTMLElement): void {
    this.view.addStyleBtn(listItemContainer);
  }

  removeStyleBtn(listItemContainer: HTMLElement): void {
    this.view.removeStyleBtn(listItemContainer);
  }

  clickSelect(select: HTMLInputElement): void {
    const valueSelect: string = select.value;
    this.view.clickSelect(valueSelect);
  }

  clickSearch(): void {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const valueInput: string = searchInput.value;
    this.view.clickSearch(valueInput);
  }

  sortCategory(category: HTMLInputElement, name: string): void {
    const productName: string = category.name;
    const parentCategory = category.parentElement as HTMLElement;
    const nameCategoryBrand = parentCategory.querySelector('.brand-name') as HTMLElement;
    const nameCategory = parentCategory.querySelector('.category-name') as HTMLElement;
    let stateHideElement = true;

    if (nameCategoryBrand?.classList.contains('hide-name') || nameCategory?.classList.contains('hide-name')) {
      stateHideElement = true;
    } else {
      stateHideElement = false;
    }

    this.view.sortCategory(productName, name, stateHideElement);
  }

  unSortCategory(category: HTMLInputElement, name: string): void {
    this.view.unSortCategory(category, name);
  }

  checkOtherCategory(category: HTMLInputElement, name: string): void {
    const productName: string = category.name;
    const dataCategories: DataCategories = getDataCategories('category');
    const dataBrands: DataCategories = getDataCategories('brand');
    let filterCatalog: IOptionsProducts[] = [];

    if (localStorage['filterCatalog']) {
      filterCatalog = JSON.parse(localStorage['filterCatalog']);
    } else {
      filterCatalog = sortingCatalog(productName, name);
    }

    checkOtherCategory(dataCategories, dataBrands, filterCatalog);
  }

  resetOtherCategory(category: HTMLInputElement, name: string): void {
    const productName: string = category.name;
    const dataCategories: DataCategories = getDataCategories('category');
    const dataBrands: DataCategories = getDataCategories('brand');
    let filterCatalog: IOptionsProducts[] = [];

    if (localStorage['filterCatalog']) {
      filterCatalog = JSON.parse(localStorage['filterCatalog']);
    } else {
      filterCatalog = sortingCatalog(productName, name);
    }

    this.view.resetOtherCategory(dataCategories, dataBrands, filterCatalog);
  }

  resetFilters(): void {
    this.view.resetFilters();
  }

  copyUrlToBuffer(btnCopy: HTMLButtonElement): void {
    const url: string = window.location.href;
    navigator.clipboard.writeText(url);

    btnCopy.innerHTML = 'COPIED';

    setTimeout(() => {
      btnCopy.innerHTML = 'COPY LINK';
    }, 600);
  }

  sortSlider(slider: noUiSlider.target, nameSlider: string): void {
    deleteSearchParams([nameSlider]);
    const valueSlider: GetResult | undefined = slider.noUiSlider?.get();
    this.view.sortSlider(valueSlider, nameSlider);
  }

  plusAmountOrder(input: HTMLInputElement): void {
    const id: number | undefined = Number(input.dataset.id);
    let price: string | null = null;
    const value = Number(input.value);
    const newValue = String(value + 1);
    const stock: string | null = getStock(id);

    if (id >= 0) {
      price = getPrice(id);
    }

    this.view.plusAmountOrder(input, newValue, price, stock);

    if (!localStorage['idProductToCart']) {
      const idStorage: IdStorage = {};
      idStorage[String(id)] = newValue;
      localStorage.setItem('idProductToCart', JSON.stringify(idStorage));
    } else {
      const idProductToCart: IdStorage = JSON.parse(localStorage['idProductToCart']);
      idProductToCart[String(id)] = newValue;
      localStorage.setItem('idProductToCart', JSON.stringify(idProductToCart));
    }
  }

  minusAmountOrder(input: HTMLInputElement): void {
    const id: number | undefined = Number(input.dataset.id);
    let price: string | null = null;
    const value = Number(input.value);
    const newValue = String(value - 1);

    if (id >= 0) {
      price = getPrice(id);
    }

    if (Number(newValue) === 0) {
      this.view.removeFromOrder(id);
    }

    this.view.minusAmountOrder(input, newValue, price);
  }

  goToCartWithPopup(): void {
    setQueryParam('popup', 'true');

    const idProduct = String(getQueryParam('id'));
    const priceProduct: string | null = getPrice(Number(idProduct));
    saveSelectedToLocalStorage(idProduct);

    localStorage.setItem('totalPrice', String(priceProduct));
    localStorage.setItem('countBuy', '1');
  }

  goToCartWithoutPopup(): void {
    deleteSearchParams(['popup']);
  }

  sendOrder(): void {
    this.view.sendOrder();

    setTimeout(() => {
      window.location.hash = 'catalog';
      this.view.resetOrder();
    }, 4000);
  }

  showPopup(): void {
    this.view.showPopup();
  }

  hidePopup(): void {
    this.view.hidePopup();
  }

  enterPromoCode(input: HTMLInputElement): void {
    const valueInput: string = input.value;

    if (valueInput === PromoCode.code1) {
      this.view.addPromoCode(PromoCode.code1);
    }

    if (valueInput === PromoCode.code2) {
      this.view.addPromoCode(PromoCode.code2);
    }

    if (valueInput !== PromoCode.code1 && valueInput !== PromoCode.code2) {
      if (document.querySelector('.discount-container') as HTMLElement) {
        (document.querySelector('.discount-container') as HTMLElement).remove();
      }
    }
  }

  applyDiscount(btn: HTMLButtonElement): void {
    this.view.applyDiscount(btn);
  }

  dropDiscount(btn: HTMLButtonElement): void {
    this.view.dropDiscount(btn);
  }

  changePageUp(): void {
    this.view.changePageUp();
  }

  changePageDown(): void {
    this.view.changePageDown();
  }

  upLimitPage(): void {
    this.view.upLimitPage();
  }

  downLimitPage(): void {
    this.view.downLimitPage();
  }
}
