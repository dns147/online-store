import AppView from "../view/AppView";
import products from "../../assets/json/products.json";

export default class AppModel {
  view: AppView;

  constructor(view: AppView) {
    this.view = view;
  }

  updateState(): void {
    const hashPageName: string = window.location.hash.slice(1);
    this.view.renderContent(hashPageName);
  }

  showProductDescription(element: HTMLElement): void {
    const id: string | undefined = element.dataset.id;
    const params = new URLSearchParams(window.location.search);

    params.set('id', `${id}`);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    window.location.hash = 'description';
  }
}