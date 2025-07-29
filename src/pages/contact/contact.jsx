import "./contact.scss";

export const Contact = () => {
  return (
    <article className="content__block contact">
      <section className="contact__text">
        <span className="contact__description">
          Like my work? Want me to paint your miniatures? Nothing could be
          easier! Just write me an email and we will agree on everything!
        </span>
        <span className="contact__email">
          <a href="mailto:paladin2004@mail.ru">paladin2004@mail.ru</a>
        </span>
      </section>
      <section className="contact__pic"></section>
    </article>
  );
};
