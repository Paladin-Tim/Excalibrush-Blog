import { UserOutlined } from "@ant-design/icons";

export const Comment = ({ author_name, content, published_at }) => {
  return (
    <section className="blog-post__comment">
      <div className="author">
        <UserOutlined />
        <span>{author_name}</span>
      </div>
      <div className="date">{published_at}</div>
      <div className="text">{content}</div>
    </section>
  );
};
