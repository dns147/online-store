import './styles/startpage.css';

export default class StartPage {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  render() {
    return `
      <div class="main-container">Start Page</div>
    `;
  }
}