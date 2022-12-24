import { getId } from "../../../utils/utils";

export default class DescriptionPage {
  container: HTMLElement;
  id: string | null;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.id = null;
  }

  render(): string {
    return `
      <div class="main-container">Description Page</div>
    `;
  }

  init(): void {
    this.id = getId();
    
    console.log(this.id);
  }
}