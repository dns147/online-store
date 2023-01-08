import { getPrice } from "../../utils/utils-catalog-page";
import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.updateStateUrl = this.updateStateUrl.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsMouseOver = this.getEventsMouseOver.bind(this);
    this.getEventsMouseOut = this.getEventsMouseOut.bind(this);
    this.getEventsChange = this.getEventsChange.bind(this);
    this.getEventsInput = this.getEventsInput.bind(this);

    window.addEventListener('popstate', this.updateStateUrl);
    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('mouseover', this.getEventsMouseOver);
    document.addEventListener('mouseout', this.getEventsMouseOut);
    document.addEventListener('change', this.getEventsChange);
    document.addEventListener('input', this.getEventsInput);

    this.updateState();
    this.updateStateUrl();
  }

  updateStateUrl(): void {
    const that = this;
    that.model.updateStateUrl();
  }

  updateState(): void {
    const that = this;
    that.model.updateState();
  }

  getEventsClick(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const product = event.target.closest('.card-product') as HTMLElement;
      const plus = event.target.closest('.plus') as HTMLElement;
      const minus = event.target.closest('.minus') as HTMLElement;
      const btnCart = event.target.closest('.btn-cart') as HTMLButtonElement;
      const btnSortType = event.target.closest('.sort-type') as HTMLElement;
      const listItem = event.target.closest('.list-item-container') as HTMLElement;
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLButtonElement;
      const logoName = event.target.closest('.logo-name') as HTMLElement;
      const order = event.target.closest('.order') as HTMLElement;

      // order popup
      const orderBtn = event.target.closest('.order-form__button') as HTMLButtonElement;
      const name = document.querySelector('.order-form__name') as HTMLInputElement;
      const phoneNum = document.querySelector('.order-form__tel') as HTMLInputElement;
      const address = document.querySelector('.order-form__address') as HTMLInputElement;
      const email = document.querySelector('.order-form__email') as HTMLInputElement;
      const cardNum = document.querySelector('.order-form__card') as HTMLInputElement;
      const cardCvv = document.querySelector('.order-form__cvv') as HTMLInputElement;
      const cardValid = document.querySelector('.order-form__valid') as HTMLInputElement;
      
      if (orderBtn) {
        event.preventDefault();

        const nameArr = name.value.trim().split(' ');
        const regexName = /[A-Za-z]{1}[A-Za-z\\'\\-]{2,}/;
        const isValidName = nameArr.length > 1 && nameArr.every((e) => regexName.test(e));
        if (!isValidName) {
          name.closest('.order-form__name-container')?.classList.add('error');
        } else {
          name.closest('.order-form__name-container')?.classList.remove('error');
        }

        const regexPhoneNum = /\+{1}[0-9]{9,}/;
        const isValidPhoneNum = regexPhoneNum.test(phoneNum.value);
        if (!isValidPhoneNum) {
          phoneNum.closest('.order-form__tel-container')?.classList.add('error');
        } else {
          phoneNum.closest('.order-form__tel-container')?.classList.remove('error');
        }

        const addressArr = address.value.trim().split(' ');
        const regexAddress = /[A-Za-z0-9\\'\\-\\.\\№\\ \\:\\"\\)\\(]{5,}/;
        const isValidAddress = addressArr.length > 2 && addressArr.every((e) => regexAddress.test(e));
        if (!isValidAddress) {
          address.closest('.order-form__address-container')?.classList.add('error');
        } else {
          address.closest('.order-form__address-container')?.classList.remove('error');
        }

        const regexEmail = /^([a-zA-Z0-9_\-\\.]+)+@([\w-]+\.)+[\w-]{2,4}$/
        const isValidEmail = regexEmail.test(email.value);
        if (!isValidEmail) {
          email.closest('.order-form__email-container')?.classList.add('error');
        } else {
          email.closest('.order-form__email-container')?.classList.remove('error');
        }

        const regexCardNum = /[0-9]{4}/;
        const isValidCardNum = regexCardNum.test(cardNum.value);
        if (!isValidCardNum) {
          cardNum.closest('.order-form__card-number')?.classList.add('error');
        } else {
          cardNum.closest('.order-form__card-number')?.classList.remove('error');
        }

        const regexCardValid = /[0-1]{1}[0-9]{1}[/][0-9]{2}/
        const isValidCardValid = regexCardValid.test(cardValid.value);
        if (!isValidCardValid) {
          cardValid.closest('.order-form__valid-container')?.classList.add('error');
        } else {
          cardValid.closest('.order-form__valid-container')?.classList.remove('error');
        }

        const regexCardCvv = /[0-9]{3}/;
        const isValidCardCvv = regexCardCvv.test(cardCvv.value);
        if (!isValidCardCvv) {
          cardCvv.closest('.order-form__cvv-container')?.classList.add('error');
        } else {
          cardCvv.closest('.order-form__cvv-container')?.classList.remove('error');
        }

        const isvalidAll = [isValidName, isValidPhoneNum, isValidPhoneNum, isValidEmail, isValidCardNum, isValidCardValid, isValidCardCvv].every((e) => e);
       
        if (isvalidAll) {
          document.querySelector('.form-container')?.classList.add('.ordered');
        }

        console.log(isvalidAll)
        console.log(isValidAddress);
        console.log(isValidName);
        console.log(isValidEmail);
        console.log(isValidPhoneNum);
        console.log(isValidCardNum);
        console.log(isValidCardValid);
        console.log(isValidCardCvv);
      }
      // 

      // for description page
      const productPic = event.target.closest('.product-info-pictures-main') as HTMLElement;
      const descriptionPopup = event.target.closest('.product-picture-popup') as HTMLElement;
      const productAdPic = event.target.closest('.product-info-pictures-item') as HTMLElement
      
      if (productPic) {
        const popup = document.querySelector('.product-picture-popup') as HTMLElement;
        const pic = productPic.firstElementChild as HTMLElement;
        const clone = pic.cloneNode() as HTMLElement;

        popup.innerHTML = '';

        clone.classList.remove('description-img');
        clone.classList.add('product-picture-popup__img');
        
        popup.append(clone);
        popup.classList.add('product-picture-popup_open');
      }

      if (descriptionPopup) {
        descriptionPopup.classList.remove('product-picture-popup_open');
      }
      
      if (productAdPic) {
        const pic = productAdPic.firstElementChild as HTMLImageElement;
        const mainPic = document.querySelector('.product-info-pictures-main .description-img') as HTMLImageElement;
        const srcForMain = pic.src;

        pic.src = mainPic.src;
        mainPic.src = srcForMain;
      }
      // for description page
      
      if (product || listItem) {
        //window.history.replaceState({}, '', `/description`);
        that.model.showDescription(product || listItem);
      }

      if (plus) {
        const parentPlus = plus.parentElement as HTMLElement;
        const inputAmountProduct = parentPlus.querySelector('.product-amount') as HTMLInputElement;
        const parentInput = parentPlus.parentElement as HTMLElement;
        const btnCart = parentInput.querySelector('.btn-cart') as HTMLElement;
        that.model.plusAmountProduct(btnCart, inputAmountProduct);
      }

      if (minus) {
        const parentMinus = minus.parentElement as HTMLElement;
        const inputAmountProduct = parentMinus.querySelector('.product-amount') as HTMLInputElement;
        that.model.minusAmountProduct(inputAmountProduct);
      }

      if (btnCart) {
        const parentBtn = btnCart.parentElement as HTMLElement;
        const parentMain = parentBtn.parentElement as HTMLElement;
        const idProduct: number | undefined = Number(parentMain.dataset.id);
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        const inputAmountProduct = parentBtn.querySelector('.product-amount') as HTMLInputElement;

        const imageProduct = parentMain.querySelector('.image-product') as HTMLElement;
        const imageParent = parentMain.querySelector('.card-product') as HTMLElement;

        that.model.changeStyleCard(btnCart, imageParent, parentBtn, String(idProduct));
        that.model.getTotalPrice(btnCart, totalPrice, priceProduct, inputAmountProduct);
        that.model.addToCart(btnCart, imageProduct, imageParent, inputAmountProduct);
      }

      if (btnSortType) {
        that.model.changeSortByType(btnSortType);
      }

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        const idProduct: number | undefined = Number(listItemContainer.dataset.id);
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        const imageProduct = listItemContainer.querySelector('.image-sorting-by-list') as HTMLElement;
        
        that.model.changeStyleCard(btnCartSortList, listItemContainer, parentBtn, String(idProduct));
        that.model.getTotalPrice(btnCartSortList, totalPrice, priceProduct);
        that.model.addToCart(btnCartSortList, imageProduct, listItemContainer);
      }

      if (logoName) {
        //that.model.setDefaultParams();
        window.history.replaceState({}, '', `/`);
      }

      if (order) {
        window.history.replaceState({}, '', `/`);
      }
    }
  }

  getEventsMouseOver(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLElement;

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        that.model.addStyleBtn(listItemContainer);
      }
    }
  }

  getEventsMouseOut(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLElement;

      if (btnCartSortList) {
        const parentBtn = btnCartSortList.parentElement as HTMLElement;
        const listItemContainer = parentBtn.querySelector('.list-item-container') as HTMLElement;
        that.model.removeStyleBtn(listItemContainer);
      }
    }
  }

  getEventsChange(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const select = event.target.closest('.search-select') as HTMLInputElement;

      if (select) {
        event.preventDefault();
        that.model.clickSelect(select);
      }
    }
  }

  getEventsInput(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const search = event.target.closest('.search-input') as HTMLInputElement;

    // for order popup 
    const phoneNum = event.target.closest('.order-form__tel') as HTMLInputElement;
    const cardNum = event.target.closest('.order-form__card') as HTMLInputElement;
    const cardFirstNum = event.target.closest('.first-numbers') as HTMLInputElement;
    const cardCvv = event.target.closest('.order-form__cvv') as HTMLInputElement;
    const cardValid = event.target.closest('.order-form__valid') as HTMLInputElement;

    if(phoneNum) {
      const regexFirstSym = /[+]/;
      const regexNum = /[0-9]/;
      if (!regexFirstSym.test(phoneNum.value[0])) {
        phoneNum.value = '';
      } else if (phoneNum.value.length > 1) {
        if (!regexNum.test(phoneNum.value[phoneNum.value.length - 1])) {
          phoneNum.value = phoneNum.value.slice(0, -1);
        }
      }
    }
    if(cardNum) {
      if (cardNum.value.length > 4) {
        cardNum.value = cardNum.value.slice(0, -1);
      }
    }
    if(cardFirstNum) {
      const systemsImg: {'3': string, '4': string, '5': string} = {
        '3': 'https://i.ibb.co/5cd0r7D/express.png',
        '4': 'https://i.ibb.co/SdrfhSy/visa.png',
        '5': 'https://i.ibb.co/Sc8dDpj/mastercard.png',
      }
      const img = document.querySelector('.order-form__payment-img') as HTMLImageElement;
      const firstInt = cardFirstNum.value[0];
      img.src = systemsImg[firstInt as keyof typeof systemsImg] || '';
    }
    if(cardCvv) {
      if (cardCvv.value.length > 3) {
        cardCvv.value = cardCvv.value.slice(0, -1);
      }
    }
    if(cardValid) {
      const regexNum = /[0-9]/;
      const regexFirstNum = /[0-1]/;
      const regexFourthNum = /[2-9]/;
      if (!regexFirstNum.test(cardValid.value[0])) {
        cardValid.value = cardValid.value.slice(0, -1);
      }
      if (cardValid.value.length === 2) {
        if (!regexNum.test(cardValid.value[1])) {
          cardValid.value = cardValid.value.slice(0, -1);
        } else {
          if (!cardValid.value.includes('/')) {
            cardValid.value = cardValid.value + '/';
          } else {
            cardValid.value = cardValid.value.replace('/', '');
          }
        }
      }
      if (+cardValid.value[0] === 1 && +cardValid.value[1] > 2) {
        cardValid.value = cardValid.value.slice(0, -2);
      }
      if (+cardValid.value[0] > 1) {
        cardValid.value = cardValid.value.slice(0, -1);
      }
      if (cardValid.value.length === 4) {
        if (!regexFourthNum.test(cardValid.value[3])) {
          cardValid.value = cardValid.value.slice(0, -1);
        }
      }
      if (cardValid.value.length === 5) {
        if (!regexNum.test(cardValid.value[4])) {
          cardValid.value = cardValid.value.slice(0, -1);
        } else {
          if (+cardValid.value[3] === 2 && +cardValid.value[4] < 3) {
            cardValid.value = cardValid.value.slice(0, -1);
          }
        }
      }
      if (cardValid.value.length > 5) {
        cardValid.value = cardValid.value.slice(0, -1);
      }
    }
    // 
      if (search) {
        event.preventDefault();
        that.model.clickSearch();
      }
    }
  }
}