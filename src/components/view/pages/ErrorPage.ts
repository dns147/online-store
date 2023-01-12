import './styles/error-page.css';

export default class ErrorPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): string {
    return `
      <div class="main-container">
        <div class="error-container">
          <div class="error-container__error-message">
            <img class="error-container__error-pic" src="https://i.ibb.co/MP2dd5r/star-wars-404.webp" alt"">
          </div>
        </div>
      </div>
    `;
  }

  init(): void {
    console.log('');
  }
}
