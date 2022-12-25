import { Routes, TypeOfClasses } from "../../utils/types";
import { showAnimateImage } from "../../utils/utils";
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

  showNewTotalPrice(totalPrice: HTMLElement, newTotalPrice: string) {
    totalPrice.innerHTML = newTotalPrice;
  }

  addToCart(countProduct: number): void {
    const countBuy = document.querySelector('.count-buy') as HTMLElement;
    const currentCountBuy: number = Number(countBuy.innerHTML);
    const newCountBuy: string = String(currentCountBuy + countProduct);
    
    countBuy.innerHTML = newCountBuy;
  }

  changeSortByType(btnSortType: HTMLElement, typeOfSort: string | undefined): void {
    if (!btnSortType.classList.contains('sort-type-active') && typeOfSort === 'list') {
      btnSortType.classList.add('sort-type-active');
      (document.querySelector('[data-type="bar"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', 'list');
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);
    }

    if (!btnSortType.classList.contains('sort-type-active') && typeOfSort === 'bar') {
      btnSortType.classList.add('sort-type-active');
      (document.querySelector('[data-type="list"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', 'bar');
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);
    } 

    console.log(typeOfSort);
  }
}