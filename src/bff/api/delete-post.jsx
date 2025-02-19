import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

export const deletePost = async (postId) => {
  const postDBRef = ref(db, `posts/${postId}`);

  await remove(postDBRef);

  return true;
};
