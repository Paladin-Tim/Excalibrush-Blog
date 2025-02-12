import { getPost } from "../api";

export const fetchPost = async (postId) => {
  const post = await getPost(postId);

//  const { id, title, content, image_url, published_at, comments } = post;

  return {
    error: null,
    res: post
  };
};
