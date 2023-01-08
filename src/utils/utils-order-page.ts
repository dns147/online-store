import products from "../assets/json/products.json";
import { IdStorage, IOptionsProducts} from "./types";

export function getOrderProducts(): IOptionsProducts[] {
  const idProducts: IdStorage = JSON.parse(localStorage['idProductToCart']);
  let orderProducts: IOptionsProducts[] = [];

  for (let id in idProducts) {
    orderProducts.push(... products.filter((product: IOptionsProducts) => product.id === Number(id)));
  }

  return orderProducts;
}