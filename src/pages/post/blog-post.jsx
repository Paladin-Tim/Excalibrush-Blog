import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/actions";
import { selectPost } from "../../redux/selectors";
import { PostContent } from "./post-content";
import { PostComments } from "./post-comments";
import { server } from "../../bff";

export const BlogPost = () => {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    server.fetchPost(params.id).then(({ res }) => {
      dispatch(setPost(res));
    });
  }, [dispatch, params.id]);

  return (
    <article className="content__block blog-post">
      <PostContent post={post} />
      <PostComments comments={post.comments} postId={post.id} />
    </article>
  );
};
