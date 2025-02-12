import { db } from "../../firebase";
import { ref, get } from "firebase/database";

export const getPost = async (postId) => {
  const postDBRef = ref(db, `posts/${postId}`);

  let post = {};

  await get(postDBRef).then((snapshot) => {
    post = snapshot.val();
  });

  return post;
};
