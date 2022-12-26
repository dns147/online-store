import './styles/catalog-page.css';
import products from "../../../assets/json/products.json";
import { IOptionsProducts, SortByType } from '../../../utils/types';
import { changeSortingByType, checkSearchParams, checkTypeOfSort, clearLocalStorage, getType, makeCardProduct } from '../../../utils/utils';

export default class CatalogPage {
  container: HTMLElement;
  sortByType: string | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.sortByType = null;
  }

  render(): string {
    return `
      <article class="main-container">
        <aside class="filter-container">
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
              <input type="search" name="search" class="search-input" id="search" placeholder="Search" autocomplete="off" autofocus="">
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
    //clearLocalStorage();
    checkSearchParams(['id']);
    makeCardProduct();

    this.sortByType = getType();
    checkTypeOfSort(this.sortByType);
    
    if (this.sortByType === SortByType.list) {
      changeSortingByType();
    }

    if (this.sortByType === SortByType.bar) {
      makeCardProduct();
    }
  }
}