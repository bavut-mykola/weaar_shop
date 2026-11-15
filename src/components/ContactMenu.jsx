import { translations } from "../locales/translations";
import { useEffect } from "react";

import facebookIcon from "../assets/icons/facebook.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import phoneIcon from "../assets/icons/phone.svg";
import ContactCard from "./ContactCard";

import "../styles/contact-menu.scss";

function ContactMenu({ isOpen, onClose, contactInfo, language }) {
  const text = translations[language];
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-menu__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="contact-menu__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-menu-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="contact-menu__header">
          <div className="contact-menu__title-wrap">
            <span className="contact-menu__title-icon" aria-hidden="true">
              <img src={phoneIcon} alt="" />
            </span>
            <h2 className="contact-menu__title" id="contact-menu-title">
              {text.contactMenu.title}
            </h2>
          </div>

          <button
            className="contact-menu__close"
            type="button"
            aria-label={text.contactMenu.close}
            onClick={onClose}
          >
            <span className="contact-menu__close-icon" aria-hidden="true" />
          </button>
        </header>

        <div className="contact-menu__grid">
          <ContactCard
            title={text.contactMenu.phoneNumbers}
          >
            <ul className="contact-menu__phone-list">
              {contactInfo.phoneNumbers.map((phoneNumber, index) => (
                <li key={`${phoneNumber.href}-${phoneNumber.label}-${index}`}>
                  <a
                    className="contact-menu__phone-link"
                    href={phoneNumber.href}
                  >
                    <img src={phoneIcon} alt="" />
                    <span>{phoneNumber.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>

          <ContactCard
            title={text.contactMenu.workingHours}
          >
            <p className="contact-menu__line">{text.contactMenu.workHours}</p>
          </ContactCard>

          <ContactCard
            title={text.contactMenu.contactInformation}
          >
            <p className="contact-menu__line">{text.contactMenu.address}</p>
          </ContactCard>

          <ContactCard
            title={text.contactMenu.socialNetworks}
          >
            <div
              className="contact-menu__socials"
              role="group"
              aria-label={text.contactMenu.socialNetworks}
            >
              <img src={instagramIcon} alt="Instagram" />
              <img src={facebookIcon} alt="Facebook" />
            </div>
          </ContactCard>
        </div>
      </section>
    </div>
  );
}

export default ContactMenu;
