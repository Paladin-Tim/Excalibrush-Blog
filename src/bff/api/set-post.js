import { db } from "../../firebase";
import { ref, update, get, push } from "firebase/database";

const postsDBRef = ref(db, "posts");

export const setPost = async (postId, title, content, imageUrls) => {
  if (!postId) {
    const newPost = {
        title: title,
        content: content,
        image_urls: imageUrls,
        published_at: new Date().toLocaleString(),
      };

      const newPostId = await push(postsDBRef, newPost).key;

      const updates = {};
      updates[newPostId] = { ...newPost, id: newPostId };
      await update(postsDBRef, updates);

      return { ...newPost, id: newPostId };
  } else {
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
  }
};
