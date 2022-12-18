import AppView from "../view/AppView";

export default class AppModel {
  view: AppView;

  constructor(view: AppView) {
    this.view = view;
  }

  updateState(): void {
    const hashPageName: string = window.location.hash.slice(1);
    this.view.renderContent(hashPageName);
  }
}