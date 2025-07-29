import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../../bff";
import { PAGINATION_LIMIT } from "../../bff/constants";
import { getPosts } from "../../redux/actions";
import { selectPostsList } from "../../redux/selectors";
import { Loader } from "../../components";
import { Carousel, Col, Row, Pagination, Input } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import "./main-page.scss";

const { Search } = Input;

export const Main = () => {
  const postsList = useSelector(selectPostsList);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const totalPages = Object.values(postsList).length;

  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value, page) => {
    if (value === "") {
      setIsSearching(false);
      setSearchResult([]);
      setCurrentPage(page);
    } else {
      setSearchResult(
        Object.values(postsList).filter((post) =>
          post.title.includes(value, 0),
        ),
      );
      setIsSearching(true);
    }
  };

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    server.fetchPosts().then(({ res }) => {
      dispatch(getPosts(res));
    });
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      isSearching
        ? setCurrentPosts(searchResult)
        : setCurrentPosts(
            Object.values(postsList).slice(
              PAGINATION_LIMIT * (currentPage - 1),
              PAGINATION_LIMIT * (currentPage - 1) + PAGINATION_LIMIT,
            ),
          );
      setIsLoading(false);
    });
  }, [postsList, currentPage, searchResult, isSearching]);

  return (
    <article className="content__block main-page">
      <section className="main-page__welcome">
        <section className="main-page__welcome-text-wrapper">
          <h1 className="main-page__welcome-title">Welcome to EXCALIBRUSH!</h1>
          <span className="main-page__welcome-description">
            Hello! My name is Tim and I have been painting miniatures for almost
            20 years. My first and main love was and remains the WarHammer
            universe (in all its manifestations), but I also follow other
            fandoms. <br></br>
            Here I share my experience and exhibit my works. If you have
            miniatures or terrain that need to be painted, I will be happy to
            help with this. Just write me on email and we will agree on
            everything. <br></br>
            Come in, make yourself comfortable and may the grace of the
            God-Emperor be with you!
          </span>
        </section>
        <div className="main-page__welcome-photo"></div>
      </section>
      <section className="main-page__post-grid-header">
        <h2 className="main-page__post-grid-title">Posts</h2>
        <Search
          allowClear
          placeholder="Search posts..."
          size="large"
          onSearch={(value) => handleSearch(value, currentPage)}
          enterButton
          className="main-page__search"
        />
      </section>

      {isLoading ? (
        <Loader />
      ) : currentPosts.length === 0 && isSearching ? (
        <span>Nothing found...</span>
      ) : (
        <>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            className="main-page__post-grid"
          >
            {currentPosts.map(
              ({ id, title, published_at, image_urls, comments }) => (
                <Col key={id} className="post-wrapper" sm={12} md={10} lg={8}>
                  <Carousel arrows infinite autoplay className="post-gallery">
                    {Object.values(image_urls).map((url) => (
                      <img
                        key={Math.random()}
                        src={url}
                        className="post-gallery__item"
                      ></img>
                    ))}
                  </Carousel>
                  <Link to={`/post/${id}`}>
                    <h4 className="post-title">{title}</h4>
                  </Link>
                  <section className="post-info">
                    <span className="post-date">
                      {/* <CalendarOutlined /> */}
                      {published_at.slice(0, 10)}
                    </span>
                    <section className="post-comments">
                      <MessageOutlined />
                      {comments != undefined
                        ? Object.values(comments).length
                        : 0}
                    </section>
                  </section>
                </Col>
              ),
            )}
          </Row>

          {!isSearching && totalPages > 2 && (
            <Pagination
              align="center"
              current={currentPage}
              onChange={handleSetPage}
              pageSize={PAGINATION_LIMIT}
              total={totalPages}
            />
          )}

          {isSearching && searchResult.length > 2 && (
            <Pagination
              align="center"
              current={currentPage}
              onChange={handleSetPage}
              pageSize={PAGINATION_LIMIT}
              total={searchResult.length}
            />
          )}
        </>
      )}
    </article>
  );
};
