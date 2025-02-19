import { setPost } from "../api";

export const editPost = async (postId, title, content, imageUrls) => {
  const updatedPost = await setPost(postId, title, content, imageUrls);

  return {
    error: null,
    res: updatedPost,
  };
};
