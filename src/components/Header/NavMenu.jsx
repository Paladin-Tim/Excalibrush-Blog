import { Link } from "react-router-dom";
import { Button } from "antd";

export const NavMenu = () => {
  return (
    <section className="buttons">
      <Link to="/">
        <Button className="menu__button">Home</Button>
      </Link>
      <Button className="menu__button">About</Button>
      <Button className="menu__button">Contact</Button>
    </section>
  );
};
