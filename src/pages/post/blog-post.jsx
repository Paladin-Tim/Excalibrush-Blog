import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, resetPost } from "../../redux/actions";
import { selectPost, selectUserRole } from "../../redux/selectors";
import { server } from "../../bff";
import { ROLE, globalErrors } from "../../bff/constants";
import { PostContent } from "./post-content";
import { PostComments } from "./post-comments";
import { PostEditForm } from "./post-edit-form";
import { GlobalError, Loader } from "../../components";

export const BlogPost = () => {
  const post = useSelector(selectPost);
  const userRole = useSelector(selectUserRole);

  const isCreating = useMatch("/post");
  const isEditing = useMatch("/post/:id/edit");
  const params = useParams();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    dispatch(resetPost());
  }, [isCreating, dispatch]);

  useEffect(() => {
    if (isCreating) {
      setIsLoading(false);
      return;
    }
    server.fetchPost(params.id).then(({ error, res }) => {
      if (error) {
        setError(error);
        setIsLoading(false);
      } else {
        dispatch(setPost(res));
        setError(null);
        setIsLoading(false);
      }
    });
  }, [isCreating, dispatch, params.id]);

  return (
    <>
      {isCreating || isEditing ? (
        userRole !== ROLE.ADMIN ? (
          <GlobalError error={globalErrors.ACCESS_DENIED} />
        ) : error ? (
          <GlobalError error={error} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <article className="content__block post-edit-form">
            <PostEditForm post={post} isEditing={isEditing} />
          </article>
        )
      ) : error ? (
        <GlobalError error={error} />
      ) : isLoading ? (
        <Loader />
      ) : (
        <article className="content__block blog-post">
          <PostContent post={post} />
          <PostComments comments={post.comments} postId={post.id} />
        </article>
      )}
    </>
  );
};
