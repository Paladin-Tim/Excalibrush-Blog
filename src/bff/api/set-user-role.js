import { db } from "../../firebase";
import { ref, update } from "firebase/database";

export const setUserRole = async (userId, roleId) => {
  const userDBRef = ref(db, `users/${userId}`);

  await update(userDBRef, { role_id: roleId });

  return true;
};
