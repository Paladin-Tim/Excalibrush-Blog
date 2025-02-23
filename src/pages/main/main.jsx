import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../bff";
import { getPosts } from "../../redux/actions";
import { selectPostsList } from "../../redux/selectors";
import { Carousel, Col, Row } from "antd";
import { CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const Main = () => {
  const postsList = useSelector(selectPostsList);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    server.fetchPosts().then(({ res }) => {
      dispatch(getPosts(res));
    });
  }, [dispatch]);

  return (
    <article className="content__block main-page">
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="main-page__post-grid"
      >
        {Object.values(postsList).map(
          ({ id, title, published_at, image_urls, comments }) => (
            <Col key={id} className="post-wrapper" sm={12} md={10} lg={8}>
              <Carousel arrows infinite autoplay className="post-gallery">
                {Object.values(image_urls).map((url) => (
                  <img key={Math.random()} src={url}></img>
                ))}
              </Carousel>
              <Link to={`/post/${id}`}>
                <h4 className="post-title">{title}</h4>
              </Link>
              <section className="post-info">
                <span className="post-date">
                  <CalendarOutlined />
                  {published_at}
                </span>
                <section className="post-comments">
                  <MessageOutlined />
                  {Object.values(comments).length || 0}
                </section>
              </section>
            </Col>
          ),
        )}
      </Row>
    </article>
  );
};
