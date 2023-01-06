import products from "../../assets/json/products.json";
import { IOptionsProducts, Routes, SortByType, TypeOfClasses } from "../../utils/types";
import { addQueryParam, changeSortingByType, clickSearchProducts, deleteSearchParams, getQueryParam, loadSelectedFromLocalStorage, makeCardProduct, removeSelectedToLocalStorage, saveSelectedToLocalStorage, searchProducts, showSortProductBarView, sortingCatalog, sortProducts } from "../../utils/utils-catalog-page";

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
    const minus = parentBtn.querySelector('.minus') as HTMLButtonElement;

    if (btnCart.classList.contains('active-btn')) {
      btnCart.innerHTML = 'ADD TO CART';
      btnCart.classList.remove('active-btn');
      imageParent.classList.remove('active-card');

      if (imageParent.classList.contains('list-item-container-active')) {
        imageParent.classList.remove('list-item-container-active');
      }
      
      if (plus) {
        plus.disabled = false;
        minus.disabled = false;
      }

      removeSelectedToLocalStorage(idProduct);
    } else {
      btnCart.innerHTML = 'DROP FROM CART';
      btnCart.classList.add('active-btn');
      imageParent.classList.add('active-card');

      if (plus) {
        plus.disabled = true;
        minus.disabled = true;
      }

      saveSelectedToLocalStorage(idProduct);
    }
  }

  changeStyleBtnCartDescription(btnCart: HTMLButtonElement, idProduct: string): void {
    if (btnCart.classList.contains('active-btn')) {
      btnCart.innerHTML = 'ADD TO CART';
      btnCart.classList.remove('active-btn');
      removeSelectedToLocalStorage(idProduct);
    } else {
      btnCart.innerHTML = 'DROP FROM CART';
      btnCart.classList.add('active-btn');
      saveSelectedToLocalStorage(idProduct);
    }
  }

  showNewTotalPrice(totalPrice: HTMLElement, newTotalPrice: string) {
    totalPrice.innerHTML = newTotalPrice;
    localStorage.setItem('totalPrice', newTotalPrice);
  }

  addToCart(btnCart: HTMLButtonElement, countProduct: number): void {
    const countBuy = document.querySelector('.count-buy') as HTMLElement;
    const currentCountBuy: number = Number(countBuy.innerHTML);
    let newCountBuy: string = '';

    if (btnCart.classList.contains('active-btn')) {
      newCountBuy = String(currentCountBuy + countProduct);
    } else {
      newCountBuy = String(currentCountBuy - countProduct);
      btnCart.removeAttribute('data-count');
    }
    
    countBuy.innerHTML = newCountBuy;
    localStorage.setItem('countBuy', newCountBuy);
  }

  changeViewType(btnViewType: HTMLElement, typeOfView: string | undefined): void {
    const search = getQueryParam('search');

    if (!btnViewType.classList.contains('sort-type-active') && typeOfView === SortByType.list) {
      btnViewType.classList.add('sort-type-active');
      (document.querySelector('[data-type="bar"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', SortByType.list);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);

      if (search) {
        clickSearchProducts(search);
      } else {
        changeSortingByType(products);
      }

      const listItemContainer = document.querySelectorAll('.list-item-container') as NodeListOf<HTMLElement>;
      const btnCartSortList = document.querySelectorAll('.btn-cart-sort-list') as NodeListOf<HTMLElement>;
      loadSelectedFromLocalStorage(listItemContainer, btnCartSortList);
    }

    if (!btnViewType.classList.contains('sort-type-active') && typeOfView === SortByType.bar) {
      btnViewType.classList.add('sort-type-active');
      (document.querySelector('[data-type="list"]') as HTMLElement).classList.remove('sort-type-active');

      const hashPageName: string = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      params.set('type', SortByType.bar);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}${hashPageName}`);

      if (search) {
        clickSearchProducts(search);
      } else {
        makeCardProduct(products);
      }

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

  clickSelect(valueSelect: string): void {
    const view = getQueryParam('type');

    switch (valueSelect) {
      case '1':
        addQueryParam('sort', SortByType.priceUp);
        const sortCatalog1: IOptionsProducts[] = sortProducts(SortByType.priceUp);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog1);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog1);
        }

        break;

      case '2':
        addQueryParam('sort', SortByType.priceDown);
        const sortCatalog2: IOptionsProducts[] = sortProducts(SortByType.priceDown);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog2);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog2);
        }

        break;

      case '3':
        addQueryParam('sort', SortByType.stockUp);
        const sortCatalog3: IOptionsProducts[] = sortProducts(SortByType.stockUp);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog3);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog3);
        }
        
        break;
      
      case '4':
        addQueryParam('sort', SortByType.stockDown);
        const sortCatalog4: IOptionsProducts[] = sortProducts(SortByType.stockDown);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog4);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog4);
        }
        
        break;
      
      case '5':
        addQueryParam('sort', SortByType.default);
        const sortCatalog5: IOptionsProducts[] = sortProducts(SortByType.default);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog5);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog5);
        }
        
        break;
  
      default:
        break;
    }
  }

  clickSearch(valueInput: string): void {
    addQueryParam('search', valueInput);

    const view = getQueryParam('type');
    const searchCatalog: IOptionsProducts[] = searchProducts(valueInput);
    const foundCount = document.querySelector('.found-count') as HTMLElement;

    foundCount.innerHTML = String(searchCatalog.length);

    if (view === SortByType.list) {
      changeSortingByType(searchCatalog);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(searchCatalog);
    }
  }

  sortCategory(categoryName: string, name: string): void {
    addQueryParam(name, categoryName);

    const view = getQueryParam('type');
    const sortCatalog: IOptionsProducts[] = sortingCatalog(categoryName, name);
    const foundCount = document.querySelector('.found-count') as HTMLElement;

    foundCount.innerHTML = String(sortCatalog.length);

    if (view === SortByType.list) {
      changeSortingByType(sortCatalog);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(sortCatalog);
    }
  }

  unSortCategory(name: string): void {
    deleteSearchParams([name]);

    const view = getQueryParam('type');
    const foundCount = document.querySelector('.found-count') as HTMLElement;
    foundCount.innerHTML = String(products.length);

    if (view === SortByType.list) {
      changeSortingByType(products);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(products);
    }
  }

  setDefaultParams(): void {
    // deleteSearchParams(['id', 'type', 'sort']);
    // showSortProductBarView('.option5', SortByType.default);
  }
}