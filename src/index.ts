import { Content, Footer, Header } from "./components/components";
import AppController from "./components/controller/AppController";
import AppModel from "./components/model/AppModel";
import AppView from "./components/view/AppView";
import CartPage from "./components/view/pages/CartPage";
import DescriptionPage from "./components/view/pages/DescriptionPage";
import ErrorPage from "./components/view/pages/ErrorPage";
import StartPage from "./components/view/pages/StartPage";
import { Components, ISpa, Routes } from "./utils/types";

const components: Components = {
  header: Header,
  content: Content,
  footer: Footer,
};

const routes: Routes = {
  default: StartPage,
  main: StartPage,
  cart: CartPage,
  description: DescriptionPage,
  error: ErrorPage,
};

const mySPA = {
  init(initObject: ISpa) {
    let { container, routes, components } = initObject;

    this.renderComponents(container, components);

    const mainContainer = document.querySelector(container) as HTMLElement;
    const view = new AppView(mainContainer, routes);
    const model = new AppModel(view);
    const controller = new AppController(model, mainContainer);
  },

  renderComponents(container: string, components: Components) {
    const root = document.querySelector(container) as HTMLElement;
    const componentsList = Object.keys(components);

    for (let item of componentsList) {
      root.innerHTML += components[item].render();
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  mySPA.init({
    container: '.body',
    routes: routes,
    components: components
  });
});
