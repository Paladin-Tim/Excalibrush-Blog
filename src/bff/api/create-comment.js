import { db } from "../../firebase";
import { ref, push, update } from "firebase/database";

export const createComment = async (postId, userId, userLogin, comment) => {
  const postCommentsDBRef = ref(db, `posts/${postId}/comments`);

  const newComment = {
    author_id: userId,
    author_name: userLogin,
    published_at: new Date().toLocaleString(),
    content: comment,
  };
  const newCommentId = await push(postCommentsDBRef, newComment).key;

  const updates = {};
  updates[newCommentId] = { ...newComment, id: newCommentId };
  await update(postCommentsDBRef, updates);

  return { ...newComment, id: newCommentId };
};
