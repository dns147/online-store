export default class ErrorPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    return `
      <div class="main-container">Error Page</div>
    `;
  }
}