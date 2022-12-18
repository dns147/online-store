export default class DescriptionPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    return `
      <div class="main-container">Description Page</div>
    `;
  }
}