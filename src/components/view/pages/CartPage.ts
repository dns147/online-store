export default class CartPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    return `
      <div class="main-container">Cart Page</div>
    `;
  }
}