import { Button } from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const PostContent = ({
  post: { id, title, content, image_url, published_at },
}) => {
  return (
    <article className="blog-post__content">
      <h2 className="blog-post__title">{title}</h2>
      <section className="blog-post__control-panel">
        <section className="blog-post__date">
          <CalendarOutlined />
          <span>{published_at}</span>
        </section>
        <section className="blog-post__menu">
          <Button icon={<EditOutlined />} onClick=""></Button>
          <Button icon={<DeleteOutlined />} onClick=""></Button>
        </section>
      </section>
      <section className="blog-post__gallery">
        <img src={image_url} style={{ maxWidth: "100vw" }}></img>
      </section>
      <section className="blog-post__text">{content}</section>
    </article>
  );
};
