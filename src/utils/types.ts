import { Header } from "../components/components";
import CatalogPage from "../components/view/pages/CatalogPage";

export type Routes = { [key: string]: typeof CatalogPage };
export type Components = { [key: string]: typeof Header };
export type InitSpa = { [key: string]: typeof Header };

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