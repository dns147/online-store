import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { getId, getPrice } from "../../utils/utils-catalog-page";
import AppModel from "../model/AppModel";

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.updateState = this.updateState.bind(this);
    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsMouseOver = this.getEventsMouseOver.bind(this);
    this.getEventsMouseOut = this.getEventsMouseOut.bind(this);
    this.getEventsChange = this.getEventsChange.bind(this);
    this.getEventsInput = this.getEventsInput.bind(this);

    window.addEventListener('hashchange', this.updateState);
    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('mouseover', this.getEventsMouseOver);
    document.addEventListener('mouseout', this.getEventsMouseOut);
    document.addEventListener('change', this.getEventsChange);
    document.addEventListener('input', this.getEventsInput);

    this.updateState();
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
      const btnViewType = event.target.closest('.sort-type') as HTMLElement;
      const listItem = event.target.closest('.list-item-container') as HTMLElement;
      const btnCartSortList = event.target.closest('.btn-cart-sort-list') as HTMLButtonElement;
      const btnReset = event.target.closest('.reset') as HTMLButtonElement;
      const btnCopy = event.target.closest('.copy') as HTMLButtonElement;
      const priceSlider = event.target.closest('.price-slider') as noUiSlider.target;
      const stockSlider = event.target.closest('.stock-slider') as noUiSlider.target;
      const plusOrder = event.target.closest('.order-plus') as HTMLElement;
      const minusOrder = event.target.closest('.order-minus') as HTMLElement;
      const btnBuyCart = event.target.closest('.buy-cart') as HTMLButtonElement;
      const btnOrder = event.target.closest('.order-image') as HTMLElement;
      const orderBtnBuy = event.target.closest('.order-btn-buy') as HTMLElement;
      const applyBtnDiscount = event.target.closest('.apply-discount') as HTMLButtonElement;
      const btnDropDiscount = event.target.closest('.drop-discount') as HTMLButtonElement;
      
      // for description page
      const productPic = event.target.closest('.product-info-pictures-main') as HTMLElement;
      const descriptionPopup = event.target.closest('.product-picture-popup') as HTMLElement;
      const productAdPic = event.target.closest('.product-info-pictures-item') as HTMLElement
      const btnCartDescription = event.target.closest('.btn-cart-description') as HTMLButtonElement;
      
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

      if (btnCartDescription) {
        const idProduct: number | undefined = Number(getId());
        const priceProduct: string | null = getPrice(idProduct);
        const totalPrice = document.querySelector('.total-price') as HTMLElement;
        
        that.model.changeStyleBtnCartDescription(btnCartDescription, String(idProduct));
        that.model.getTotalPrice(btnCartDescription, totalPrice, priceProduct);
        that.model.addToCartFromDescription(btnCartDescription);
      }
      // for description page

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

        if (isvalidAll && isValidAddress && isValidName && isValidEmail && isValidPhoneNum && isValidCardNum && isValidCardValid && isValidCardCvv) {
          that.model.sendOrder();
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
      
      if (product || listItem) {
        that.model.showDescription(product || listItem);
      }

      if (plus) {
        const parentPlus = plus.parentElement as HTMLElement;
        const inputAmountProduct = parentPlus.querySelector('.product-amount') as HTMLInputElement;
        const parentInput = parentPlus.parentElement as HTMLElement;
        const upParentInput = parentInput.parentElement as HTMLElement;
        const btnCart = parentInput.querySelector('.btn-cart') as HTMLElement;
        that.model.plusAmountProduct(btnCart, inputAmountProduct, upParentInput);
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

      if (btnViewType) {
        that.model.changeViewType(btnViewType);
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

      if (btnReset) {
        that.model.resetFilters();
      }

      if (btnCopy) {
        that.model.copyUrlToBuffer();
      }

      if (priceSlider) {
        this.model.sortSlider(priceSlider, 'price');
      }

      if (stockSlider) {
        this.model.sortSlider(stockSlider, 'stock');
      }

      if (plusOrder) {
        const parentPlus = plusOrder.parentElement as HTMLElement;
        const inputAmountProduct = parentPlus.querySelector('.order-input-amount') as HTMLInputElement;
        that.model.plusAmountOrder(inputAmountProduct);
      }

      if (minusOrder) {
        const parentMinus = minusOrder.parentElement as HTMLElement;
        const inputAmountProduct = parentMinus.querySelector('.order-input-amount') as HTMLInputElement;
        that.model.minusAmountOrder(inputAmountProduct);
      }

      if (btnBuyCart) {
        that.model.goToCartWithPopup();
      }

      if (btnOrder) {
        that.model.goToCartWithoutPopup();
      }

      if (orderBtnBuy) {
        that.model.showPopup();
      }

      if (applyBtnDiscount) {
        that.model.applyDiscount(applyBtnDiscount);
      }

      if (btnDropDiscount) {
        that.model.dropDiscount(btnDropDiscount);
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
      const category1 = event.target.closest('.category1') as HTMLInputElement;
      const category2 = event.target.closest('.category2') as HTMLInputElement;
      const category3 = event.target.closest('.category3') as HTMLInputElement;
      const category4 = event.target.closest('.category4') as HTMLInputElement;

      const brand1 = event.target.closest('.brand1') as HTMLInputElement;
      const brand2 = event.target.closest('.brand2') as HTMLInputElement;
      const brand3 = event.target.closest('.brand3') as HTMLInputElement;
      const brand4 = event.target.closest('.brand4') as HTMLInputElement;

      if (select) {
        event.preventDefault();
        that.model.clickSelect(select);
      }

      if (category1) {
        if (category1.checked) {
          that.model.sortCategory(category1, 'category');
          that.model.checkOtherCategory(category1, 'category');
        } else {
          that.model.unSortCategory(category1, 'category');
          that.model.resetOtherCategory(category1, 'category');
        }
      }

      if (category2) {
        if (category2.checked) {
          that.model.sortCategory(category2, 'category');
          that.model.checkOtherCategory(category2, 'category');
        } else {
          that.model.unSortCategory(category2, 'category');
          that.model.resetOtherCategory(category2, 'category');
        }
      }

      if (category3) {
        if (category3.checked) {
          that.model.sortCategory(category3, 'category');
          that.model.checkOtherCategory(category3, 'category');
        } else {
          that.model.unSortCategory(category3, 'category');
          that.model.resetOtherCategory(category3, 'category');
        }
      }

      if (category4) {
        if (category4.checked) {
          that.model.sortCategory(category4, 'category');
          that.model.checkOtherCategory(category4, 'category');
        } else {
          that.model.unSortCategory(category4, 'category');
          that.model.resetOtherCategory(category4, 'category');
        }
      }

      if (brand1) {
        if (brand1.checked) {
          that.model.sortCategory(brand1, 'brand');
          that.model.checkOtherCategory(brand1, 'brand');
        } else {
          that.model.unSortCategory(brand1, 'brand');
          that.model.resetOtherCategory(brand1, 'brand');
        }
      }

      if (brand2) {
        if (brand2.checked) {
          that.model.sortCategory(brand2, 'brand');
          that.model.checkOtherCategory(brand2, 'brand');
        } else {
          that.model.unSortCategory(brand2, 'brand');
          that.model.resetOtherCategory(brand2, 'brand');
        }
      }

      if (brand3) {
        if (brand3.checked) {
          that.model.sortCategory(brand3, 'brand');
          that.model.checkOtherCategory(brand3, 'brand');
        } else {
          that.model.unSortCategory(brand3, 'brand');
          that.model.resetOtherCategory(brand3, 'brand');
        }
      }

      if (brand4) {
        if (brand4.checked) {
          that.model.sortCategory(brand4, 'brand');
          that.model.checkOtherCategory(brand4, 'brand');
        } else {
          that.model.unSortCategory(brand4, 'brand');
          that.model.resetOtherCategory(brand4, 'brand');
        }
      }
    }
  }

  getEventsInput(event: Event): void {
    const that = this;

    if (event.target instanceof Element) {
      const search = event.target.closest('.search-input') as HTMLInputElement;
      const promoCode = event.target.closest('.promo-code-input') as HTMLInputElement;

      // for order popup 
      const phoneNum = event.target.closest('.order-form__tel') as HTMLInputElement;
      const cardNum = event.target.closest('.order-form__card') as HTMLInputElement;
      const cardFirstNum = event.target.closest('.first-numbers') as HTMLInputElement;
      const cardCvv = event.target.closest('.order-form__cvv') as HTMLInputElement;
      const cardValid = event.target.closest('.order-form__valid') as HTMLInputElement;

      if (phoneNum) {
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

      if (cardNum) {
        if (cardNum.value.length > 4) {
          cardNum.value = cardNum.value.slice(0, -1);
        }
      }

      if (cardFirstNum) {
        const systemsImg: {'3': string, '4': string, '5': string} = {
          '3': 'https://i.ibb.co/5cd0r7D/express.png',
          '4': 'https://i.ibb.co/SdrfhSy/visa.png',
          '5': 'https://i.ibb.co/Sc8dDpj/mastercard.png',
        }
        const img = document.querySelector('.order-form__payment-img') as HTMLImageElement;
        const firstInt = cardFirstNum.value[0];
        img.src = systemsImg[firstInt as keyof typeof systemsImg] || '';
      }

      if (cardCvv) {
        if (cardCvv.value.length > 3) {
          cardCvv.value = cardCvv.value.slice(0, -1);
        }
      }

      if (cardValid) {
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

      if (promoCode) {
        event.preventDefault();
        that.model.enterPromoCode(promoCode);
      }
    }
  }
}