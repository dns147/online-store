import '../global.css';

export const Header = {
  render: () => {
    return `
      <header class="container header">
        <div class="logo-container">
          <div class="logo"></div>
          <h1 class="logo-name"><a href="#main" class="cart">Online Store</a></h1>
        </div>

        <div class="cart-total-container">
          <p class="cart-total">Cart total: <span class="total-price"></span></p>
        </div>

        <div class="cart-container">
          <a href="#cart" class="cart">
            <img src="https://i.ibb.co/Ypg3JLJ/cart2.png" width="36" alt="image" class="cart-image">
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
      <footer class="container footer">
        <ul class="footer-list">
          <li class="footer-item">
            <span class="copy">©2023</span>
          </li>
          <li class="footer-item">
            <a href="https://rs.school/" class="footer-link">The Rolling Scopes School</a>
          </li>
          <li class="footer-item">
            <a href="https://github.com/dns147" class="footer-link">dns147</a>
            <a href="https://github.com/Tatiana-Shylovich" class="footer-link">Tatiana-Shylovich</a>
          </li>
        </ul>
      </footer>
    `;
  }
};
