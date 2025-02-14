import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

export const deleteComment = async (postId, commentId) => {
  const commentDBRef = ref(db, `posts/${postId}/comments/${commentId}`);

  await remove(commentDBRef);

  return true;
};
