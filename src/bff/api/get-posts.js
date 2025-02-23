import { db } from "../../firebase";
import { ref, get } from "firebase/database";

const postsDBRef = ref(db, "posts");

export const getPosts = async () => {
  let posts = {};

  await get(postsDBRef).then((snapshot) => {
    posts = snapshot.val();
  });
  return posts;
};
