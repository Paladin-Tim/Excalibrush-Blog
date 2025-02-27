import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { server } from "../../bff";
import { PAGINATION_LIMIT } from "../../bff/constants";
import { getPosts } from "../../redux/actions";
import { selectPostsList } from "../../redux/selectors";
import { Loader } from "../../components";
import { Carousel, Col, Row, Pagination, Input } from "antd";
import { CalendarOutlined, MessageOutlined } from "@ant-design/icons";

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
      <section className="main-page__post-grid-header">
        <h2 className="main-page__post-grid-title">Posts</h2>
        <Search
          allowClear
          placeholder="Search posts..."
          size="large"
          onSearch={(value) => handleSearch(value, currentPage)}
          enterButton
          className="search"
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
