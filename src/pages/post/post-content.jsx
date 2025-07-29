import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/selectors";
import { ROLE } from "../../bff/constants";
import { ImageGallery } from "../../components/PageContent/ImageGallery/ImageGallery";
import { DeletePostButton } from "../../components/DeletePostButton/DeletePostButton";
import { Button } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";

export const PostContent = ({
  post: { id, title, content, image_urls, published_at },
}) => {
  const userRole = useSelector(selectUserRole);

  const navigate = useNavigate();

  return (
    <article className="blog-post__content">
      <section className="blog-post__date">
        {/* <CalendarOutlined /> */}
        <span>{published_at.slice(0, 10)}</span>
      </section>
      <section className="blog-post__control-panel">
        <h2 className="blog-post__title">{title}</h2>
        {userRole === ROLE.ADMIN && (
          <section className="blog-post__menu">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`/post/${id}/edit`)}
            ></Button>
            <DeletePostButton postId={id} />
          </section>
        )}
      </section>
      <section className="blog-post__gallery">
        <ImageGallery postImgURLs={image_urls} />
      </section>
      <section className="blog-post__text">{content}</section>
    </article>
  );
};
