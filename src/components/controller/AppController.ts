import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.updateState = this.updateState.bind(this);

    window.addEventListener('hashchange', this.updateState);  
    this.updateState();
  }

  updateState(): void {
    const that = this;
    that.model.updateState();
  }
}