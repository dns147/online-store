import './styles/catalog-page.css';
import products from "../../../assets/json/products.json";
import { SortByType } from '../../../utils/types';
import { deleteSearchParams, checkTypeOfSort, getQueryParam, showSortProductListView, showSortProductBarView, clickSearchProducts, addFilterCategory, makePriceSlider, makeStockSlider, checkQueryParams } from '../../../utils/utils-catalog-page';

export default class CatalogPage {
  container: HTMLElement;
  typeOfView: string | null;
  sort: string | null;
  search: string | null;
  category: string | null;
  brand: string | null;
  price: string | null;
  stock: string | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.typeOfView = null;
    this.sort = null;
    this.search = null;
    this.category = null;
    this.brand = null;
    this.price = null;
    this.stock = null;
  }

  render(): string {
    return `
      <article class="main-container">
        <aside class="filter-container">
          <div class="btn-filters">
            <button class="reset">Reset Filters</button>
            <button class="copy">Copy Link</button>
          </div>
          <div class="category-container">
            <h3 class="category-header">Category</h3>
            <div class="category-filters"></div>
          </div>
          <div class="brand-container">
            <h3 class="category-header">Brand</h3>
            <div class="brand-filters"></div>
          </div>
          <div class="price-container">
            <h3 class="category-header">Price</h3>
            <div class="price-slider"></div>
          </div>
          <div class="stock-container">
            <h3 class="category-header">Stock</h3>
            <div class="stock-slider"></div>
          </div>
        </aside>
        <section class="catalog-container">
          <div class="catalog-header">
            <form class="sort-form">
              <select name="sort-name" class="search-select">
                <option value="1" class="search-option option1">Sort by price ↑</option>
                <option value="2" class="search-option option2">Sort by price ↓</option>
                <option value="3" class="search-option option3">Sort by stock ↑</option>
                <option value="4" class="search-option option4">Sort by stock ↓</option>
                <option value="5" selected="" class="search-option option5">Default sort</option>
              </select>
            </form>
            <div class="found">
              <p>Found: <span class="found-count">20</span></p>
            </div>
            <form class="search-form">
              <input type="search" name="search" class="search-input" id="search" placeholder="Search" autocomplete="off">
              <button type="submit" class="search-btn"></button>
            </form>
            <div class="sort-type-container">
              <img src="https://i.ibb.co/9GQ7M5J/bar1.png" alt="image" class="sort-type sort-type-active" data-type="bar">
              <img src="https://i.ibb.co/QD06C0k/list1.png" alt="image" class="sort-type" data-type="list">
            </div>
          </div>
          <div class="catalog-list">
          </div>
        </section>
      </article>
    `;
  }

  init(): void {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const categoryFilters = document.querySelector('.category-filters') as HTMLElement;
    const brandFilters = document.querySelector('.brand-filters') as HTMLElement;
    const priceSlider = document.querySelector('.price-slider') as HTMLElement;
    const stockSlider = document.querySelector('.stock-slider') as HTMLElement;

    addFilterCategory(categoryFilters, 'category');
    addFilterCategory(brandFilters, 'brand');
    makePriceSlider(priceSlider);
    makeStockSlider(stockSlider);
    deleteSearchParams(['id', 'popup', 'limit', 'page', 'pages']);

    this.typeOfView = getQueryParam('type');
    this.sort = getQueryParam('sort');
    this.search = getQueryParam('search');
    this.category = getQueryParam('category');
    this.brand = getQueryParam('brand');
    this.price = getQueryParam('price');
    this.stock = getQueryParam('stock');

    localStorage.removeItem('limit');
    localStorage.removeItem('page');
    localStorage.removeItem('summaryPage');
    localStorage.removeItem('startIndex');
    localStorage.removeItem('previousStartIndex');
    localStorage.removeItem('previousProductsInPage');

    localStorage.removeItem('filterCatalog');
    checkTypeOfSort(this.typeOfView);
   
    if (this.typeOfView === SortByType.list && this.sort === SortByType.priceUp) {
      showSortProductListView('.option1', SortByType.priceUp);
    }

    if (this.typeOfView === SortByType.list && this.sort === SortByType.priceDown) {
      showSortProductListView('.option2', SortByType.priceDown);
    }

    if (this.typeOfView === SortByType.list && this.sort === SortByType.stockUp) {
      showSortProductListView('.option3', SortByType.stockUp);
    }

    if (this.typeOfView === SortByType.list && this.sort === SortByType.stockDown) {
      showSortProductListView('.option4', SortByType.stockDown);
    }

    if (this.typeOfView === SortByType.list && this.sort === SortByType.default) {
      showSortProductListView('.option5', SortByType.default);
    }

    if ((!this.typeOfView && this.sort === SortByType.priceUp) ||
        (this.typeOfView === SortByType.bar && this.sort === SortByType.priceUp)) {
      showSortProductBarView('.option1', SortByType.priceUp);
    }

    if ((!this.typeOfView && this.sort === SortByType.priceDown) ||
        (this.typeOfView === SortByType.bar && this.sort === SortByType.priceDown)) {
      showSortProductBarView('.option2', SortByType.priceDown);
    }

    if ((!this.typeOfView && this.sort === SortByType.stockUp) || 
        (this.typeOfView === SortByType.bar && this.sort === SortByType.stockUp)) {
      showSortProductBarView('.option3', SortByType.stockUp);
    }

    if ((!this.typeOfView && this.sort === SortByType.stockDown) || 
        (this.typeOfView === SortByType.bar && this.sort === SortByType.stockDown)) {
      showSortProductBarView('.option4', SortByType.stockDown);
    }

    if ((!this.typeOfView && this.sort === SortByType.default) || 
        (this.typeOfView === SortByType.bar && this.sort === SortByType.default)) {
      showSortProductBarView('.option5', SortByType.default);
    }

    if (!this.typeOfView && !this.sort) {
      showSortProductBarView('.option5', SortByType.default);
    }

    if ((this.typeOfView === SortByType.bar) && !this.sort) {
      showSortProductBarView('.option5', SortByType.default);
    }

    if ((this.typeOfView === SortByType.list) && !this.sort) {
      showSortProductListView('.option5', SortByType.default);
    }

    if (localStorage['totalPrice']) {
      (document.querySelector('.total-price') as HTMLElement).innerHTML = localStorage['totalPrice'];
    }

    if (localStorage['countBuy']) {
      (document.querySelector('.count-buy') as HTMLElement).innerHTML = localStorage['countBuy'];
    }

    if (this.search) {
      searchInput.value = this.search;
      clickSearchProducts(this.search);
    }

    if (this.category || this.brand || this.price || this.stock) {
      checkQueryParams();
    }
  }
}