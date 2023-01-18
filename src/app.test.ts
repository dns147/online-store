import products from './assets/json/products.json';
import CatalogPage from './components/view/pages/CatalogPage';
import DescriptionPage from './components/view/pages/DescriptionPage';
import OrderPage from './components/view/pages/OrderPage';
import ErrorPage from './components/view/pages/ErrorPage';
import { getOrderProducts, getStock } from './utils/utils-order-page';
import { IdStorage, IOptionsProducts } from './utils/types';
import { Content, Footer, Header } from './components/components';
import {
  getProductAmount,
  getId,
  getQueryParam,
  getPrice,
  getDataCategories,
  sortProducts,
  searchProducts,
} from './utils/utils-catalog-page';

describe('getStock should get stock of product by id product', () => {
  test('adds 0 to equal "44"', () => {
    expect(getStock(0)).toBe('44');
  });
});

describe('getOrderProducts should get array products by id product', () => {
  const idProducts: IdStorage = { '0': '1' };
  const result: IOptionsProducts[] = [products[0]];

  test('adds idProducts to equal result', () => {
    expect(getOrderProducts(idProducts)).toStrictEqual(result);
  });
});

describe('getProductAmount should get amount product by id product', () => {
  test(`adds '0' to equal > 0`, () => {
    expect(getProductAmount('0')).not.toContain('0');
  });
});

describe('class CatalogPage should have methods init and render', () => {
  const container: HTMLElement = document.createElement('div');
  const catalog = new CatalogPage(container);
  const description = new DescriptionPage(container);
  const order = new OrderPage(container);
  const error = new ErrorPage(container);

  test('class CatalogPage should be difined', () => {
    expect(catalog.init).toBeDefined();
    expect(catalog.render).toBeDefined();
  });

  test('class DescriptionPage should be difined', () => {
    expect(description.init).toBeDefined();
    expect(description.render).toBeDefined();
  });

  test('class OrderPage should be difined', () => {
    expect(order.init).toBeDefined();
    expect(order.render).toBeDefined();
  });

  test('class ErrorPage should be difined', () => {
    expect(error.init).toBeDefined();
    expect(error.render).toBeDefined();
  });
});

describe('component should make render component', () => {
  const componentHeader = Header.render();
  const componentMain = Content.render();
  const componentFooter = Footer.render();

  test('add component header', () => {
    expect(componentHeader.includes('header')).toBe(true);
  });

  test('add component main', () => {
    expect(componentMain.includes('main')).toBe(true);
  });

  test('add component footer', () => {
    expect(componentFooter.includes('footer')).toBe(true);
  });
});

describe('getId', () => {
  test('returns null', () => {
    expect(getId()).toBeNull();
  });
});

describe('getQueryParam', () => {
  const type = 'brand';

  test('returns null', () => {
    expect(getQueryParam(type)).toBeNull();
  });
});

describe('first product in list', () => {
  const id = products[0].id;

  test('is worth 15', () => {
    expect(getPrice(id)).toBe('15');
  });
});

describe('getDataCategories', () => {
  const name = 'brand';

  test('returns object', () => {
    expect(getDataCategories(name)).toBeInstanceOf(Object);
  });
});

describe('sortProducts', () => {
  const typeSort = 'price-up';

  test('returns array', () => {
    expect(sortProducts(typeSort)).toBeInstanceOf(Array);
  });
});

describe('search field', () => {
  const valueInput = 'Greedo';

  test('shows 1 product', () => {
    expect(searchProducts(valueInput)).toHaveLength(1);
  });
});
