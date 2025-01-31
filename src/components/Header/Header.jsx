import { Link } from "react-router-dom";
import { SearchPanel } from "./SearchPanel";
import { NavMenu } from "./NavMenu";
import { AuthPanel } from "./AuthPanel";
import "./Header.scss";

export const Header = () => {
  return (
    <article className="header">
      <section className="header__logo-wrapper">
        <Link to="/">
          <div className="logo"></div>
        </Link>
      </section>
      <nav className="header__menu">
        <NavMenu />
        <SearchPanel />
      </nav>
      <AuthPanel />
    </article>
  );
};
