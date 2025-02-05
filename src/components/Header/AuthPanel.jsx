import { Link, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import {
  UserOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserRole,
  selectUserLogin,
  selectUserSession,
} from "../../redux/selectors";
import { logout } from "../../redux/actions";
import { ROLE } from "../../bff/constants";

export const AuthPanel = () => {
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      key: "sub1",
      label: login,
      icon: <UserOutlined />,
      children:
        roleId === ROLE.ADMIN
          ? [
              {
                key: "0",
                label: "Users",
                icon: <UsergroupDeleteOutlined />,
              },
              {
                key: "1",
                label: "New post",
                icon: <FileAddOutlined />,
              },
              {
                key: "2",
                label: "Log out",
                icon: <LogoutOutlined />,
              },
            ]
          : [
              {
                key: "2",
                label: "Log out",
                icon: <LogoutOutlined />,
              },
            ],
    },
  ];

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "0":
        navigate("/users");
        break;
      case "2":
        dispatch(logout(session));
    }
  };

  return (
    <section className="header__auth-panel">
      {roleId === ROLE.GUEST ? (
        <Link to="/login">
          <Button>Log in</Button>
        </Link>
      ) : (
        <Menu
          className="admin__menu"
          onClick={(e) => handleMenuClick(e)}
          mode="vertical"
          items={items}
        />
      )}
    </section>
  );
};
