import { deleteSearchParams } from "../../../utils/utils-catalog-page";
import './styles/popup-order.css';

export default class OrderPage {
  container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
  }

  render(): string {
    return `
      <div class="main-container">Order Page
        <div class="popup-order">
          <div class="popup-wrapper">
            <div class="form-container">
              <form class="order-form">
                <div class="order-form__personal-data">
                  <div class="order-form__name-container">
                    <input class="order-form__name order-input" type="text" placeholder="Name and Surname" title="at least 2 words in English(3 characters each)">
                  </div>
                  <div class="order-form__tel-container">
                    <input class="order-form__tel order-input" type="tel" placeholder="Phone number" title="begins with '+', at least 9 digits">
                  </div>
                  <div class="order-form__address-container">
                    <input class="order-form__address order-input" type="text" placeholder="Delivery adress" title="at least 3 words in English(5 characters each)">
                  </div>
                  <div class="order-form__email-container">
                    <input class="order-form__email order-input" type="email" placeholder="Email xxxxx@xxxxx.xxx">
                  </div>
                </div>
                <div class="order-form__card-data">
                  <h3 class="order-form__card-heading">imperial bank</h3>
                  <div class="order-form__payment-info">
                    <div class="order-form__payment-system">
                      <img class="order-form__payment-img" src="" alt=""></img>
                    </div>
                    <div class="order-form__card-number">
                      <input class="order-form__card first-numbers order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                      <input class="order-form__card order-input" type="number" placeholder="0000" pattern="[0-9]{4}">
                    </div>
                  </div>
                  <div class="order-form__card-info">
                    <div class="order-form__valid-container">
                      <label class="order-form__valid-text" for="valid">
                      <span>valid</span><span>thru</span>
                      </label>
                      <input id="valid" class="order-form__valid order-input" type="text" placeholder="00/00" pattern="[0-1]{1}[0-9]{1}/[0-9]{2}">
                    </div>
                    <div class="order-form__cvv-container">
                      <label class="order-form__cvv-text" for="cvv">cvv</label>
                      <input id="cvv" class="order-form__cvv order-input" type="number" placeholder="000" pattern="[0-9]{3}">
                    </div>
                  </div>
                </div>
                <button class="order-form__button" type="submit">confirm</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  init(): void {
    deleteSearchParams(['id', 'type', 'sort']);
  }
}