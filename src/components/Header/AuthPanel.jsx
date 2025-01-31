import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import {
  UserOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const items = [
  {
    key: "sub1",
    label: "User name",
    icon: <UserOutlined />,
    children: [
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
    ],
  },
];

export const AuthPanel = () => {
  return (
    <section className="header__auth-panel">
      <Link to="/login">
        <Button>Log in</Button>
      </Link>
      <Menu onClick="" mode="vertical" items={items} />
    </section>
  );
};
