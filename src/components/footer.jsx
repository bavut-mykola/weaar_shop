import instagramIcon from '../assets/icons/instagram.svg';
import facebookIcon from '../assets/icons/facebook.svg';

import '../styles/footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <h2 className="footer__logo">WEA.R</h2>

          <p className="footer__description">
            Simple everyday clothes
            <br />
            designed to fit your unique
            <br />
            style and bring comfort to
            <br />
            your routine.
          </p>

          <div className="footer__socials">
            <img src={instagramIcon} alt="Instagram" className="footer__social" />
            <img src={facebookIcon} alt="Facebook" className="footer__social" />
          </div>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Catalog</h3>

          <nav className="footer__links">
            <a href="#">Pants</a>
            <a href="#">Hoodies</a>
            <a href="#">Jeans</a>
            <a href="#">T-Shirts</a>
            <a href="#">Outerwear</a>
          </nav>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">Services</h3>

          <nav className="footer__links">
            <a href="#">About Us</a>
            <a href="#">Support</a>
            <a href="#">Delivery &amp; Payment</a>
            <a href="#">Returns &amp; Exchanges</a>
            <a href="#">Size Guide</a>
          </nav>
        </div>

        <div className="footer__column footer__contacts">
          <h3 className="footer__title">Contacts</h3>

          <div className="footer__contact">
            <a href="tel:+380000000000">+380 (xx) xxx xx xx</a>
            <a href="tel:+380000000000">+380 (xx) xxx xx xx</a>
            <p>123 Fashion Street, Lviv</p>
            <p>Mon - Sun: 9:00 - 21:00</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">
          <span className="footer__bottom-logo">WEA.R</span>
          <span className="footer__divider"></span>
          <span>All rights reserved.</span>
        </div>

        <a href="#" className="footer__privacy">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;