function ContactCard({ title, children }) {
  return (
    <section className="contact-menu__card">
      <div className="contact-menu__card-heading">
        <h3 className="contact-menu__card-title">{title}</h3>
      </div>

      <div className="contact-menu__card-body">{children}</div>
    </section>
  );
}

export default ContactCard;
