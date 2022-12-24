import { Routes } from "../../utils/types";
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

    const page: CatalogPage = new this.routes[routeName](this.container);
    this.contentContainer.innerHTML = page.render();
    page.init();
  }
}