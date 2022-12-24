import './styles/startpage.css';
import products from "../../../assets/json/products.json";
import { IOptionsProducts } from '../../../utils/types';
import { checkSearchParams, makeCardProduct } from '../../../utils/utils';

export default class CatalogPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): string {
    return `
      <article class="main-container">
        <aside class="filter-container">
        </aside>
        <section class="catalog-container">
          <div class="catalog-header">
          </div>
          <div class="catalog-list">
          </div>
        </section>
      </article>
    `;
  }

  init(): void {
    checkSearchParams();
    makeCardProduct();
  }
}