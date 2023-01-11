import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import products from "../../assets/json/products.json";
import { DataCategories, Discount, DiscountName, GetResult, IdStorage, IOptionsProducts, PromoCode, Routes, SortByType, TypeOfClasses } from "../../utils/types";
import { setQueryParam, changeSortingByType, clickSearchProducts, getQueryParam, loadSelectedFromLocalStorage, makeCardProduct, removeSelectedToLocalStorage, saveSelectedToLocalStorage, searchProducts, sortingCatalog, sortProducts, addQueryParam, deleteQueryParam, findSumCategory, findSumBrand, resetInput, resetHideStyle, getDataCategories, deleteSearchParams, checkOtherCategory, changeSliderPrice, changeSliderStock } from "../../utils/utils-catalog-page";
import { addLimitPage, changeProductInPage, fillProductItems, getOrderProducts } from '../../utils/utils-order-page';

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
        setQueryParam('sort', SortByType.priceUp);
        const sortCatalog1: IOptionsProducts[] = sortProducts(SortByType.priceUp);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog1);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog1);
        }

        break;

      case '2':
        setQueryParam('sort', SortByType.priceDown);
        const sortCatalog2: IOptionsProducts[] = sortProducts(SortByType.priceDown);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog2);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog2);
        }

        break;

      case '3':
        setQueryParam('sort', SortByType.stockUp);
        const sortCatalog3: IOptionsProducts[] = sortProducts(SortByType.stockUp);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog3);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog3);
        }
        
        break;
      
      case '4':
        setQueryParam('sort', SortByType.stockDown);
        const sortCatalog4: IOptionsProducts[] = sortProducts(SortByType.stockDown);

        if (view === SortByType.list) {
          changeSortingByType(sortCatalog4);
        }

        if (!view || (view === SortByType.bar)) {
          makeCardProduct(sortCatalog4);
        }
        
        break;
      
      case '5':
        setQueryParam('sort', SortByType.default);
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
    setQueryParam('search', valueInput);

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

    const dataCategories: DataCategories = getDataCategories('category');
    const dataBrands: DataCategories = getDataCategories('brand');
    checkOtherCategory(dataCategories, dataBrands, searchCatalog);

    changeSliderPrice(searchCatalog);
    changeSliderStock(searchCatalog);
  }

  sortCategory(categoryName: string, name: string, stateHideElement: boolean): void {
    addQueryParam(name, categoryName);

    const view = getQueryParam('type');
    let filterCatalog: IOptionsProducts[] = [];
    const foundCount = document.querySelector('.found-count') as HTMLElement;

    if (localStorage['filterCatalog'] && JSON.parse(localStorage['filterCatalog']).length !== 0 && !stateHideElement) {
      filterCatalog = JSON.parse(localStorage['filterCatalog']);
    } else if (localStorage['filterCatalog'] && JSON.parse(localStorage['filterCatalog']).length !== 0 && stateHideElement) {
      filterCatalog = JSON.parse(localStorage['filterCatalog']).concat(sortingCatalog(categoryName, name));
    } else {
      filterCatalog = sortingCatalog(categoryName, name);
    }

    localStorage.setItem('filterCatalog', JSON.stringify(filterCatalog));
    foundCount.innerHTML = String(filterCatalog.length);

    if (view === SortByType.list) {
      changeSortingByType(filterCatalog);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(filterCatalog);
    }

    changeSliderPrice(filterCatalog);
    changeSliderStock(filterCatalog);
  }

  unSortCategory(category: HTMLInputElement, name: string): void {
    const productName: string = category.name;
    const numberCategory: string | undefined = category.dataset.num;
    let inputCategory = null;
    
    deleteQueryParam(productName, name);

    if (name === 'category') {
      inputCategory = document.querySelector(`.brand${numberCategory}`) as HTMLInputElement;
    }

    if (name === 'brand') {
      inputCategory = document.querySelector(`.category${numberCategory}`) as HTMLInputElement;
    }

    const productsLocalStorage: IOptionsProducts[] = JSON.parse(localStorage['filterCatalog']);
    let filterProduct: IOptionsProducts[] = [];
  
    if (name === 'category' && !inputCategory?.checked) {
      filterProduct = productsLocalStorage.filter((item: IOptionsProducts) => item.category !== productName);
    } else if (name === 'category' && inputCategory?.checked) {
      filterProduct = productsLocalStorage;
    }

    if (name === 'brand' && !inputCategory?.checked) {
      filterProduct = productsLocalStorage.filter((item: IOptionsProducts) => item.brand !== productName);
    } else if (inputCategory?.checked) {
      filterProduct = productsLocalStorage;
    }

    localStorage.setItem('filterCatalog', JSON.stringify(filterProduct));
    const resultFilter = filterProduct.length ? filterProduct : products;
    const foundCount = document.querySelector('.found-count') as HTMLElement;
    foundCount.innerHTML = String(resultFilter.length);
    const view = getQueryParam('type');

    if (view === SortByType.list) {
      changeSortingByType(resultFilter);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(resultFilter);
    }

    changeSliderPrice(resultFilter);
    changeSliderStock(resultFilter);
  }

  resetOtherCategory(dataCategories: DataCategories, dataBrands: DataCategories, filterCatalog: IOptionsProducts[]): void {
    const nameCategories = document.querySelectorAll('.category-name') as NodeListOf<Element>;
    const countCategories = document.querySelectorAll('.category-find') as NodeListOf<Element>;
    const nameBrands = document.querySelectorAll('.brand-name') as NodeListOf<Element>;
    const countBrands = document.querySelectorAll('.brand-find') as NodeListOf<Element>;
    let sumCategories: number[] = [];
    let sumBrands: number[] = [];

    if (filterCatalog.length === 0) {
      sumCategories = findSumCategory(dataCategories, products);
      sumBrands = findSumBrand(dataBrands, products);

      nameCategories.forEach((nameCategory) => {
        if (nameCategory.classList.contains('hide-name')) {
          nameCategory.classList.remove('hide-name');
        }
      });

      nameBrands.forEach((nameBrand) => {
        if (nameBrand.classList.contains('hide-name')) {
          nameBrand.classList.remove('hide-name');
        }
      });
    } else {
      sumCategories = findSumCategory(dataCategories, filterCatalog);
      sumBrands = findSumBrand(dataBrands, filterCatalog);
    }

    countCategories.forEach((countCategory, index) => {
      countCategory.innerHTML = String(sumCategories[index]);

      if (sumCategories[index] === 0) {
        nameCategories[index].classList.add('hide-name');
      }
    });

    countBrands.forEach((countBrand, index) => {
      countBrand.innerHTML = String(sumBrands[index]);

      if (sumBrands[index] === 0) {
        nameBrands[index].classList.add('hide-name');
      }
    });
  }

  resetFilters(): void {
    const categoryInputs = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    const brandInputs = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;
    const nameCategories = document.querySelectorAll('.category-name') as NodeListOf<Element>;
    const countCategories = document.querySelectorAll('.category-find') as NodeListOf<Element>;
    const nameBrands = document.querySelectorAll('.brand-name') as NodeListOf<Element>;
    const countBrands = document.querySelectorAll('.brand-find') as NodeListOf<Element>;
    const foundCount = document.querySelector('.found-count') as HTMLElement;

    resetInput(categoryInputs);
    resetInput(brandInputs);
    resetHideStyle(nameCategories);
    resetHideStyle(nameBrands);
    deleteSearchParams(['category', 'brand', 'price', 'stock', 'sort', 'search']);

    const dataCategories: DataCategories = getDataCategories('category');
    const dataBrands: DataCategories = getDataCategories('brand');
    let index1: number = 0;
    let index2: number = 0;
    const view = getQueryParam('type');

    for (let key in dataCategories) {
      countCategories[index1].innerHTML = String(dataCategories[key]);
      index1 += 1;
    }

    for (let key in dataBrands) {
      countBrands[index2].innerHTML = String(dataBrands[key]);
      index2 += 1;
    }

    if (view === SortByType.list) {
      changeSortingByType(products);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(products);
    }

    foundCount.innerHTML = String(products.length);
    localStorage.removeItem('filterCatalog');

    changeSliderPrice(products);
    changeSliderStock(products);
  }

  sortSlider(valueSlider: GetResult | undefined, nameSlider: string): void {
    const valueSliderString: string | undefined = valueSlider?.toString();

    if (valueSliderString && nameSlider === 'price') {
      setQueryParam('price', valueSliderString);
    }

    if (valueSliderString && nameSlider === 'stock') {
      setQueryParam('stock', valueSliderString);
    }

    const view = getQueryParam('type');
    const foundCount = document.querySelector('.found-count') as HTMLElement;
    let filterCatalog: IOptionsProducts[] = sortingCatalog(JSON.stringify(valueSlider), nameSlider);
    
    localStorage.setItem('filterCatalog', JSON.stringify(filterCatalog));
    foundCount.innerHTML = String(filterCatalog.length);

    if (view === SortByType.list) {
      changeSortingByType(filterCatalog);
    }

    if (!view || (view === SortByType.bar)) {
      makeCardProduct(filterCatalog);
    }

    if (nameSlider === 'price') {
      changeSliderStock(filterCatalog, true);
    }

    if (nameSlider === 'stock') {
      changeSliderPrice(filterCatalog, true);
    }

    const dataCategories: DataCategories = getDataCategories('category');
    const dataBrands: DataCategories = getDataCategories('brand');
    checkOtherCategory(dataCategories, dataBrands, filterCatalog);
  }

  plusAmountOrder(input: HTMLInputElement, newValue: string, price: string | null, stock: string | null): void {
    const totalPrice = document.querySelector('.total-price') as HTMLElement;
    const countBuy = document.querySelector('.count-buy') as HTMLElement;
    
    const parentInput = input.parentElement as HTMLElement;
    const upParentInput = parentInput.parentElement as HTMLElement;
    const itemStock = upParentInput.querySelector('.item-stock') as HTMLElement;
    const itemPrice = upParentInput.querySelector('.item-price') as HTMLElement;
    const summaryTotalNumber = document.querySelector('.order-total-number') as HTMLElement;
    const summaryTotalPrice = document.querySelector('.count-total-price') as HTMLElement;
    const plus = upParentInput.querySelector('.order-plus') as HTMLButtonElement;
    
    const currentCountBuy = Number(countBuy.innerHTML);
    const newCountBuy = currentCountBuy + 1;
    countBuy.innerHTML = String(newCountBuy);

    const currentTotalPrice = Number(totalPrice.innerHTML);
    const newTotalPrice = currentTotalPrice + Number(price);
    totalPrice.innerHTML = String(newTotalPrice);

    const currentStock = Number(itemStock.innerHTML);
    const newStock: number = ((currentStock - 1) >= 0) ? (currentStock - 1) : 0;
    itemStock.innerHTML = String(newStock);

    if (newStock === 0) {
      plus.disabled = true;
      input.value = String(stock);
    } else {
      input.value = newValue;
    }

    const currentPrice = Number(itemPrice.innerHTML);
    const newPrice: number = currentPrice + Number(price);
    itemPrice.innerHTML = String(newPrice);

    summaryTotalNumber.innerHTML = String(newCountBuy);
    summaryTotalPrice.innerHTML = String(newTotalPrice);
    localStorage.setItem('countBuy', String(newCountBuy));
    localStorage.setItem('totalPrice', String(newTotalPrice));
  }

  minusAmountOrder(input: HTMLInputElement, newValue: string, price: string | null, stock: string | null): void {
    input.value = newValue;
    const totalPrice = document.querySelector('.total-price') as HTMLElement;
    const countBuy = document.querySelector('.count-buy') as HTMLElement;

    const parentInput = input.parentElement as HTMLElement;
    const upParentInput = parentInput.parentElement as HTMLElement;
    const itemStock = upParentInput.querySelector('.item-stock') as HTMLElement;
    const itemPrice = upParentInput.querySelector('.item-price') as HTMLElement;
    const summaryTotalNumber = document.querySelector('.order-total-number') as HTMLElement;
    const summaryTotalPrice = document.querySelector('.count-total-price') as HTMLElement;
    const plus = upParentInput.querySelector('.order-plus') as HTMLButtonElement;

    const currentCountBuy = Number(countBuy.innerHTML);
    const newCountBuy = currentCountBuy - 1;
    countBuy.innerHTML = String(newCountBuy);

    const currentTotalPrice = Number(totalPrice.innerHTML);
    const newTotalPrice = currentTotalPrice - Number(price);
    totalPrice.innerHTML = String(newTotalPrice);

    const currentStock = Number(itemStock.innerHTML);
    const newStock: number = currentStock + 1;
    itemStock.innerHTML = String(newStock);

    if (newStock > 0) {
      plus.disabled = false;
    }

    const currentPrice = Number(itemPrice.innerHTML);
    const newPrice: number = currentPrice - Number(price);
    itemPrice.innerHTML = String(newPrice);

    summaryTotalNumber.innerHTML = String(newCountBuy);
    summaryTotalPrice.innerHTML = String(newTotalPrice);
    localStorage.setItem('countBuy', String(newCountBuy));
    localStorage.setItem('totalPrice', String(newTotalPrice));
  }

  removeFromOrder(id: number): void {
    const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
    const limitPage = Number(getQueryParam('limit'));
    const startIndex: number = 0;

    delete idProducts[id];
    localStorage.setItem('idProductToCart', JSON.stringify(idProducts));

    const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);

    if (orderProducts.length === 0) {
      const mainCartContainer = document.querySelector('.main-cart-container') as HTMLElement;
      const productInCart = document.querySelector('.product-in-cart') as HTMLElement;
      const summaryContainer = document.querySelector('.total-cart') as HTMLElement;
      
      productInCart.classList.add('hide-container');
      summaryContainer.classList.add('hide-container');

      const textEmpty: HTMLHeadingElement = document.createElement('h2');
      textEmpty.innerHTML = 'Cart is Empty';
      textEmpty.classList.add('text-empty');
      mainCartContainer.append(textEmpty);
    } 

    const productItemsContainer = this.container.querySelector('.product-items') as HTMLElement;
    productItemsContainer.innerHTML = '';
    fillProductItems(orderProducts, productItemsContainer, limitPage, startIndex, true);
  }

  sendOrder(): void {
    const popup = document.querySelector('.popup-order') as HTMLElement;
    const text: HTMLSpanElement = document.createElement('span');
    text.innerHTML = 'ORDER IS PROCESSED';
    text.classList.add('send-order-text');
    popup.prepend(text);
  }

  resetOrder(): void {
    (document.querySelector('.total-price') as HTMLElement).innerHTML = '0';
    (document.querySelector('.count-buy') as HTMLElement).innerHTML = '0';

    localStorage['totalPrice'] = 0;
    localStorage['countBuy'] = 0;
    localStorage.removeItem('idProductToCart');
  }

  showPopup(): void {
    const popup = document.querySelector('.popup-order') as HTMLElement;
    popup.classList.add('active-popup');
  }

  hidePopup(): void {
    const popup = document.querySelector('.popup-order') as HTMLElement;
    popup.classList.remove('active-popup');
  }

  addPromoCode(promoCode: string): void {
    let discount: number = 0;
    let discountName: string = '';

    if (promoCode === PromoCode.code1) {
      discount = Discount.discount1;
      discountName = DiscountName.discountName1;
    }

    if (promoCode === PromoCode.code2) {
      discount = Discount.discount2;
      discountName = DiscountName.discountName2;
    }

    const oldDiscountName = document.querySelectorAll('.discount-name') as NodeListOf<HTMLElement>;
    const promoEx = document.querySelector('.promo-ex') as HTMLElement;
    const discountContainer: HTMLDivElement = document.createElement('div');
    discountContainer.classList.add('discount-container');

    if (oldDiscountName.length > 0 && ((Number(oldDiscountName[0]?.dataset.discount) === discount) || (Number(oldDiscountName[1]?.dataset.discount) === discount))) {
      discountContainer.innerHTML = `
        <span class="discount-name">${discountName}</span>
      `;
    } else {
      discountContainer.innerHTML = `
        <span class="discount-name">${discountName}</span>
        <button class="apply-discount" data-discount=${discount}>ADD</button>
      `;
    }
    
    promoEx.after(discountContainer);
  }

  applyDiscount(btn: HTMLButtonElement): void {
    const currentPriceContainer = document.querySelector('.order-total-price') as HTMLElement;
    const summaryPrice = currentPriceContainer.querySelector('.count-total-price') as HTMLElement;
    const oldPriceContainer = document.querySelector('.new-price-container') as HTMLElement;
    const currentPrice = Number(summaryPrice.innerHTML);
    const currentDiscount = Number(btn.dataset.discount);
    let newPrice: number = 0;
    let discountName: string = '';

    if (currentDiscount === Discount.discount1) {
      discountName = DiscountName.discountName1;
    }

    if (currentDiscount === Discount.discount2) {
      discountName = DiscountName.discountName2;
    }

    if (oldPriceContainer) {
      const newCurrentPrice = Number((document.querySelector('.new-price-discount') as HTMLElement).innerHTML);
      newPrice = newCurrentPrice - ((newCurrentPrice * currentDiscount) / 100);

      oldPriceContainer.innerHTML = `
        <span class="price-discount">Total price: $<span class="new-price-discount">${newPrice}</span></span>
      `;
    } else {
      newPrice = currentPrice - ((currentPrice * currentDiscount) / 100);
      const newPriceContainer: HTMLDivElement = document.createElement('div');
      newPriceContainer.classList.add('new-price-container');

      newPriceContainer.innerHTML = `
        <span class="price-discount">Total price: $<span class="new-price-discount">${newPrice}</span></span>
      `;

      currentPriceContainer.classList.add('old-price');
      currentPriceContainer.after(newPriceContainer);
    }

    const oldApplyDiscountContainer = document.querySelector('.apply-discount-container') as HTMLElement;
    
    if (oldApplyDiscountContainer) {
      const newDiscountContainer: HTMLDivElement = document.createElement('div');
      newDiscountContainer.innerHTML = `
        <span class="discount-name" data-discount=${currentDiscount}>${discountName}</span>
        <button class="drop-discount" data-discount=${currentDiscount}>DROP</button>
      `;

      oldApplyDiscountContainer.append(newDiscountContainer);
    } else {
      const container = document.querySelector('.new-price-container') as HTMLElement;
      const applyDiscountContainer: HTMLDivElement = document.createElement('div');
      applyDiscountContainer.classList.add('apply-discount-container')
      applyDiscountContainer.innerHTML = `
        <h4>Applied codes</h4>
        <span class="discount-name" data-discount=${currentDiscount}>${discountName}</span>
        <button class="drop-discount" data-discount=${currentDiscount}>DROP</button>
      `;

      container.after(applyDiscountContainer);
    }

    btn.remove();
  }

  dropDiscount(btn: HTMLButtonElement): void {
    btn.remove();
    const discount = Number(btn.dataset.discount);
    const discountName = document.querySelectorAll('.discount-name') as NodeListOf<HTMLElement>;
    const applyDiscountContainer = document.querySelector('.apply-discount-container') as HTMLElement;
    const newPriceDiscount = document.querySelector('.new-price-discount') as HTMLElement;
    const newPriceContainer = document.querySelector('.new-price-container') as HTMLElement;
    const currentPriceContainer = document.querySelector('.order-total-price') as HTMLElement;
    const currentPriceDiscount = Number(newPriceDiscount.innerHTML);

    discountName.forEach((item) => {
      if (Number(item.dataset.discount) === discount) {
        item.remove();
        const newPrice: number = (currentPriceDiscount * 100) / (100 - discount);
        newPriceDiscount.innerHTML = String(newPrice);
      }
    });

    if (discountName.length === 2) {
      applyDiscountContainer.remove();
      newPriceContainer.remove();
      currentPriceContainer.classList.remove('old-price');
    }
  }

  changePageUp(): void {
    const elemSummaryPage = document.querySelector('.summary-page') as HTMLElement;
    const countPageDom = document.querySelector('.count-page') as HTMLElement;
    const countPage = Number(countPageDom.innerHTML);
    const summaryPage = Number(elemSummaryPage.innerHTML);
    const newCountPage = ((countPage + 1) > summaryPage) ? summaryPage : (countPage + 1);
    countPageDom.innerHTML = String(newCountPage);

    const btnPageLeft = document.querySelector('.page-left') as HTMLButtonElement;
    btnPageLeft.disabled = false;
    
    if (newCountPage === summaryPage) {
      const btnPageRight = document.querySelector('.page-right') as HTMLButtonElement;
      btnPageRight.disabled = true;
    }

    if (summaryPage === 1) {
      return;
    }

    setQueryParam('page', String(newCountPage));
    localStorage.setItem('page', String(newCountPage));

    const productsInPage = document.querySelectorAll('.item-product') as NodeListOf<Element>;
    let startIndex: number = 0;

    if (localStorage['startIndex']) {
      startIndex = Number(localStorage['startIndex']);
    } else {
      startIndex = productsInPage.length;
    }

    localStorage.setItem('previousStartIndex', String(startIndex));
    localStorage.setItem('previousProductsInPage', String(productsInPage.length));

    const limitPage: number = Number(getQueryParam('limit'));
    changeProductInPage(limitPage, startIndex, true);
  }

  changePageDown(): void {
    const elemCountPage = document.querySelector('.count-page') as HTMLElement;
    const countPage = Number(elemCountPage.innerHTML);
    const newCountPage = ((countPage - 1) > 0) ? (countPage - 1) : 1;
    elemCountPage.innerHTML = String(newCountPage);

    const btnPageRight = document.querySelector('.page-right') as HTMLButtonElement;
    btnPageRight.disabled = false;

    if (countPage === 1 || newCountPage === 1) {
      const btnPageLeft = document.querySelector('.page-left') as HTMLButtonElement;
      btnPageLeft.disabled = true;
    }

    if (countPage === 1) {
      return;
    }

    setQueryParam('page', String(newCountPage));
    localStorage.setItem('page', String(newCountPage));

    const productsInPage = document.querySelectorAll('.item-product') as NodeListOf<Element>;
    let startIndex: number = 0;

    if (localStorage['startIndex']) {
      startIndex = Number(localStorage['previousStartIndex']) - Number(localStorage['previousProductsInPage']);
      localStorage.setItem('previousStartIndex', String(startIndex));
    } else {
      startIndex = productsInPage.length;
    }

    const limitPage: number = Number(getQueryParam('limit'));

    changeProductInPage(limitPage, startIndex, false);
  }

  upLimitPage(): void {
    const limitInput = document.querySelector('.limit-input') as HTMLInputElement;
    const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
    const orderProducts: IOptionsProducts[] = getOrderProducts(idProducts);

    const limit: number = (Number(limitInput.value) + 1 > orderProducts.length) ? orderProducts.length : Number(limitInput.value) + 1;
    limitInput.value = String(limit);

    addLimitPage(limit, true);
  }

  downLimitPage(): void {
    const limitInput = document.querySelector('.limit-input') as HTMLInputElement;
    const limit: number = (Number(limitInput.value) - 1) <= 1 ? 1 : Number(limitInput.value) - 1;
    limitInput.value = String(limit);

    addLimitPage(limit, false);
  }
}