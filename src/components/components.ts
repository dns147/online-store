import '../global.css';

export const Header = {
  render: () => {
    return `
      <header class="container header">
        <div class="logo-container">
          <div class="logo"></div>
          <h1>
            <a href="#main" class="logo-name">
              <span class="name">Star Wars</span>Store
            </a>
          </h1>
        </div>

        <div class="cart-total-container">
          <p class="cart-total">Cart total: <span class="total-price">0</span></p>
        </div>

        <div class="cart-container">
          <a href="#cart" class="cart">
            <img src="https://i.ibb.co/Ypg3JLJ/cart2.png" width="50" alt="image" class="cart-image">
            <span class="count-buy">0</span>
          </a>
        </div>
      </header>
    `;
  }
};

export const Content = {
  render: () => {
    return `
      <main class="main">

      </main>
    `;
  }
};

export const Footer = {
  render: () => {
    return `
      <footer class="footer">
        <ul class="footer-list">
          <li class="footer-item item-github">
            <img src="https://svgshare.com/i/og2.svg" width="70" alt="icon" class="github-link">
            <a href="https://github.com/dns147" class="footer-link">dns147</a>
            <a href="https://github.com/Tatiana-Shylovich" class="footer-link">Tatiana-Shylovich</a>
          </li>
          <li class="footer-item">
            <span class="copy">2023</span>
          </li>
          <li class="footer-item">
            <a href="https://rs.school/js/" target="_blank">
              <img src="https://rs.school/images/rs_school_js.svg" width="70" alt="icon" class="rs-link">
            </a>
          </li>
        </ul>
      </footer>
    `;
  }
};
