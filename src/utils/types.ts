import { Header } from "../components/components";
import CatalogPage from "../components/view/pages/CatalogPage";

export type Routes = { [key: string]: typeof TypeOfClasses };
export type Components = { [key: string]: typeof Header };
export type InitSpa = { [key: string]: typeof Header };

export class TypeOfClasses {
  constructor(elem: HTMLElement) {}
  render(): string {
    return '';
  }
  init(): void {}
}

export interface ISpa {
  container: string;
  routes: Routes;
  components: Components;
}

export interface IOptionsProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
}