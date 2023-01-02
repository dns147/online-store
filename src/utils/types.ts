import { Header } from "../components/components";

export type Routes = { [key: string]: typeof TypeOfClasses };
export type Components = { [key: string]: typeof Header };
export type InitSpa = { [key: string]: typeof Header };
export type IdStorage = { [key: string]: string };
export type DataCategories = { [key: string]: number };

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

export enum SortByType {
  list = 'list',
  bar = 'bar',
  priceUp = 'price-up',
  priceDown = 'price-down',
  stockUp = 'stock-up',
  stockDown = 'stock-down',
  default = 'default'
}