import { Link } from "react-router-dom";
import { Button } from "antd";

export const NavMenu = () => {
  return (
    <section className="buttons">
      <Link to="/">
        <Button className="menu__button">Home</Button>
      </Link>
      <Link to="/contact">
        <Button className="menu__button">Contact</Button>
      </Link>
    </section>
  );
};
