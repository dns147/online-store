import { checkSearchParams } from "../../../utils/utils";

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
    checkSearchParams();
  }
}