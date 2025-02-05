import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

export const deleteUser = async (userId) => {
  const userDBRef = ref(db, `users/${userId}`);

  await remove(userDBRef);

  return true;
};
