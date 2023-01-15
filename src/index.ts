import { Content, Footer, Header } from './components/components';
import AppController from './components/controller/AppController';
import AppModel from './components/model/AppModel';
import AppView from './components/view/AppView';
import OrderPage from './components/view/pages/OrderPage';
import DescriptionPage from './components/view/pages/DescriptionPage';
import ErrorPage from './components/view/pages/ErrorPage';
import CatalogPage from './components/view/pages/CatalogPage';
import { Components, ISpa, Routes } from './utils/types';

const components: Components = {
  header: Header,
  content: Content,
  footer: Footer,
};

const routes: Routes = {
  default: CatalogPage,
  catalog: CatalogPage,
  order: OrderPage,
  description: DescriptionPage,
  error: ErrorPage,
};

const mySPA = {
  init(initObject: ISpa) {
    const { container, routes, components } = initObject;

    this.renderComponents(container, components);

    const mainContainer = document.querySelector(container) as HTMLElement;
    const view = new AppView(mainContainer, routes);
    const model = new AppModel(view);
    new AppController(model, mainContainer);
  },

  renderComponents(container: string, components: Components) {
    const root = document.querySelector(container) as HTMLElement;
    const componentsList = Object.keys(components);

    for (const item of componentsList) {
      root.innerHTML += components[item].render();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  mySPA.init({
    container: '.body',
    routes: routes,
    components: components,
  });
});
