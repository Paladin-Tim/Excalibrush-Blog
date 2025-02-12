import { db } from "../../firebase";
import { ref, push, update } from "firebase/database";

const usersDBRef = ref(db, "users");

export const addUser = async (login, password) => {
  const newUser = {
    login,
    password,
    registred_at: new Date().toLocaleString(),
    role_id: "02",
  };
  const newUserId = await push(usersDBRef, newUser).key;

  const updates = {};
  updates[newUserId] = { ...newUser, id: newUserId };
  await update(usersDBRef, updates);

  return { ...newUser, id: newUserId };
};
