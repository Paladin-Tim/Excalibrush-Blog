import { useEffect, useLayoutEffect } from "react";
import { useParams, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, resetPost } from "../../redux/actions";
import { selectPost } from "../../redux/selectors";
import { server } from "../../bff";
import { PostContent } from "./post-content";
import { PostComments } from "./post-comments";
import { PostEditForm } from "./post-edit-form";

export const BlogPost = () => {
  const post = useSelector(selectPost);
  const isCreating = useMatch("/post");
  const isEditing = useMatch("/post/:id/edit");
  const dispatch = useDispatch();
  const params = useParams();

  useLayoutEffect(() => {
    dispatch(resetPost());
  }, [isCreating, dispatch]);

  useEffect(() => {
    if (isCreating) {
      return;
    }
    server.fetchPost(params.id).then(({ res }) => {
      dispatch(setPost(res));
    });
  }, [isCreating, dispatch, params.id]);

  return (
    <>
      {isCreating || isEditing ? (
        <article className="content__block post-edit-form">
          <PostEditForm post={post} isEditing={isEditing} />
        </article>
      ) : (
        <article className="content__block blog-post">
          <PostContent post={post} />
          <PostComments comments={post.comments} postId={post.id} />
        </article>
      )}
    </>
  );
};
