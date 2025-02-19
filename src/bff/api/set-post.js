import { db } from "../../firebase";
import { ref, update, get } from "firebase/database";

export const setPost = async (postId, title, content, imageUrls) => {
  const postDBRef = ref(db, `posts/${postId}`);

  await update(postDBRef, {
    title: title,
    content: content,
    image_urls: imageUrls,
  });

  let updatedPost = {};

  await get(postDBRef).then((snapshot) => {
    updatedPost = snapshot.val();
  });

  return updatedPost;
};
