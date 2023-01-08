import { IOptionsProducts } from "../../../utils/types";
import { deleteSearchParams } from "../../../utils/utils-catalog-page";
import { getOrderProducts } from "../../../utils/utils-order-page";

export default class OrderPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): string {
    return `
      <div class="main-container">Order Page</div>
    `;
  }

  init(): void {
    deleteSearchParams(['id', 'sort']);

    const orderProducts: IOptionsProducts[] = getOrderProducts();

    console.log(orderProducts);
  }
}