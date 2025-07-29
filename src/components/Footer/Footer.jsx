import { WeatherWidget } from "./components/WeatherWidget";
import "./Footer.scss";

export const Footer = () => {
  return (
    <article className="footer">
      <section className="footer__credits">
        <div className="email">
          <a href="mailto:paladin2004@mail.ru">paladin2004@mail.ru</a>
        </div>
        <div className="copyright">© 2025 Excalibrush</div>
      </section>
      <WeatherWidget />
    </article>
  );
};
