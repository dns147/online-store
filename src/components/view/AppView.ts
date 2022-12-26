import { Routes, SortByType, TypeOfClasses } from "../../utils/types";
import { changeSortingByType, loadSelectedFromLocalStorage, makeCardProduct, removeSelectedToLocalStorage, saveSelectedToLocalStorage, showAnimateImage } from "../../utils/utils";
import CatalogPage from "./pages/CatalogPage";

export default class AppView {
  container: HTMLElement;
  routes: Routes;
  contentContainer: HTMLElement;
  
  constructor(container: HTMLElement, routes: Routes) {
    this.container = container;
    this.routes = routes;

    this.contentContainer = container.querySelector('.main') as HTMLElement;
  }

  renderContent(hashPageName: string) {
    let routeName = 'catalog';

    if (hashPageName.length > 0) {
      routeName = hashPageName in this.routes ? hashPageName : 'error';
    }

    window.document.title = routeName;

    const page: TypeOfClasses = new this.routes[routeName](this.container);
    this.contentContainer.innerHTML = page.render();
    page.init();
  }

  changeStyleCard(btnCart: HTMLButtonElement, imageParent: HTMLElement, parentBtn: HTMLElement, idProduct: string): void {
    const plus = parentBtn.querySelector('.plus') as HTMLButtonElement;

    if (btnCart.classList.contains('active-btn')) {
      
      btnCart.innerHTML = 'ADD TO CART';
      btnCart.classList.remove('active-btn');
      imageParent.classList.remove('active-card');

      if (imageParent.classList.contains('list-item-container-active')) {
        imageParent.classList.remove('list-item-container-active');
      }
      
      if (plus) {
        plus.disabled = false;
      }

      removeSelectedToLocalStorage(idProduct);
    } else {
      
      btnCart.innerHTML = 'DROP FROM CART';
      btnCart.classList.add('active-btn');
      imageParent.classList.add('active-card');

      if (plus) {
        plus.disabled = true;
      }

      saveSelectedToLocalStorage(idProduct);
    }
  }

  showNewTotalPrice(totalPrice: HTMLElement, newTotalPrice: string) {
    totalPrice.innerHTML = newTotalPrice;
  }

  addToCart(btnCart: HTMLButtonElement, countProduct: number): void {
    const countBuy = document.querySelector('.count-buy') as HTMLElement;
    const currentCountBuy: number = Number(countBuy.innerHTML);
    let newCountBuy: string = '';

    if (btnCart.classList.contains('active-btn')) {
      newCountBuy = String(currentCountBuy + countProduct);
    } else {
      newCountBuy = String(currentCountBuy - countProduct);
    }
    
    countBuy.innerHTML = newCountBuy;
  }

  changeSortByType(btnSortType: HTMLElement, typeOfSort: string | undefined): void {
    if (!btnSortType.classList.contains('sort-type-active') && typeOfSort === SortByType.list) {
      btnSortType.classList.add('sort-type-active');
      (document.querySelector('[data-type="bar"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', SortByType.list);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);

      changeSortingByType();

      const listItemContainer = document.querySelectorAll('.list-item-container') as NodeListOf<HTMLElement>;
      const btnCartSortList = document.querySelectorAll('.btn-cart-sort-list') as NodeListOf<HTMLElement>;
      loadSelectedFromLocalStorage(listItemContainer, btnCartSortList);
    }

    if (!btnSortType.classList.contains('sort-type-active') && typeOfSort === SortByType.bar) {
      btnSortType.classList.add('sort-type-active');
      (document.querySelector('[data-type="list"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', SortByType.bar);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);

      makeCardProduct();

      const itemContainer = document.querySelectorAll('.card-product') as NodeListOf<HTMLElement>;
      const btnCart = document.querySelectorAll('.btn-cart') as NodeListOf<HTMLElement>;
      loadSelectedFromLocalStorage(itemContainer, btnCart);
    }
  }

  addStyleBtn(listItemContainer: HTMLElement): void {
    listItemContainer.classList.add('list-item-container-active');
  }

  removeStyleBtn(listItemContainer: HTMLElement): void {
    listItemContainer.classList.remove('list-item-container-active');
  }
}