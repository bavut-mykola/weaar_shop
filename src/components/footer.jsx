import instagramIcon from "../assets/icons/instagram.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contactInfo";

import "../styles/footer.scss";

import { translations } from "../locales/translations";

const Footer = ({ language }) => {
  const text = translations[language];
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">
          <img src="/the_main_logo.svg" alt="WEA.R" className="footer__logo" />

          <p className="footer__description">
            Simple everyday clothes
            <br />
            designed to fit your unique style
            <br />
            and bring comfort to your routine.
          </p>

          <div className="footer__socials">
            <img
              src={instagramIcon}
              alt="Instagram"
              className="footer__social"
            />
            <img src={facebookIcon} alt="Facebook" className="footer__social" />
          </div>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">
            <Link className="footer__catalog-link" to="/catalog">
              {text.footer.catalog}
            </Link>
          </h3>

          <nav className="footer__links">
            <Link to="/catalog?category=pants">{text.categories.pants}</Link>
            <Link to="/catalog?category=hoodies">{text.categories.hoodies}</Link>
            <Link to="/catalog?category=jeans">{text.categories.jeans}</Link>
            <Link to="/catalog?category=t-shirts">{text.categories["t-shirts"]}</Link>
            <Link to="/catalog?category=outerwear">{text.categories.outerwear}</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3 className="footer__title">{text.footer.services}</h3>

          <nav className="footer__links">
            <Link to="/about">{text.footer.about}</Link>
            <Link to="/support">{text.footer.support}</Link>
            <Link to="/delivery-payment">{text.footer.deliveryPayment}</Link>
            <Link to="/returns-exchanges">{text.footer.returnsExchanges}</Link>
            <Link to="/size-guide">{text.footer.sizeGuide}</Link>
          </nav>
        </div>

        <div className="footer__column footer__contacts">
          <h3 className="footer__title">{text.footer.contacts}</h3>

          <div className="footer__contact">
            {contactInfo.phoneNumbers.map((phoneNumber, index) => (
              <a
                href={phoneNumber.href}
                key={`${phoneNumber.href}-${phoneNumber.label}-${index}`}
              >
                {phoneNumber.label}
              </a>
            ))}
            <p>{text.contactMenu.address}</p>
            <p>{text.contactMenu.workHours}</p>
          </div>
        </div>
      </div>

      <div className="footer__statement">
        <p className="footer__tagline">{text.home.tagline}</p>
        <p className="footer__statement-copy">
          Modern, minimal and comfortable clothing for everyday life.
          <br />
          Discover new collections, timeless essentials and your next favorite pieces at W.EAR.
        </p>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">
          <span className="footer__copyright-icon" aria-hidden="true">
            ©
          </span>
          <img
            src="/the_main_logo.svg"
            alt=""
            className="footer__bottom-logo"
          />
          <span className="footer__divider"></span>
          <span>{text.footer.rights}</span>
        </div>

        <Link to="/privacy-policy" className="footer__privacy">
          {text.footer.privacyPolicy}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
