import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../../bff";
import { PAGINATION_LIMIT } from "../../bff/constants";
import { getPosts } from "../../redux/actions";
import { selectPostsList } from "../../redux/selectors";
import { Carousel, Col, Row, Pagination } from "antd";
import { CalendarOutlined, MessageOutlined } from "@ant-design/icons";

export const Main = () => {
  const postsList = useSelector(selectPostsList);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const totalPages = Object.values(postsList).length;

  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    server.fetchPosts().then(({ res }) => {
      dispatch(getPosts(res));
    });

    setCurrentPosts(
      Object.values(postsList).slice(
        PAGINATION_LIMIT * (currentPage - 1),
        PAGINATION_LIMIT * (currentPage - 1) + PAGINATION_LIMIT,
      ),
    );
  }, [dispatch, currentPage, postsList]);

  return (
    <article className="content__block main-page">
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="main-page__post-grid"
      >
        {currentPosts.map(
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

      <Pagination
        align="center"
        current={currentPage}
        onChange={handleSetPage}
        pageSize={3}
        total={totalPages}
      />
    </article>
  );
};
