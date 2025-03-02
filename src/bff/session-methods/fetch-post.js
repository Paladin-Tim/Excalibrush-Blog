import { getPost } from "../api";
import { globalErrors } from "../constants";

export const fetchPost = async (postId) => {
  const post = await getPost(postId);

  return !post
    ? {
        error: globalErrors.PAGE_NOT_FOUND,
        res: null,
      }
    : {
        error: null,
        res: post,
      };
};
