import { db } from "../firebase";
import { ref, push } from "firebase/database";

const usersDBRef = ref(db, "users");

export const addUser = async (login, password) => {
  let newUser = {
    login,
    password,
    registred_at: new Date().toLocaleDateString(),
    role_id: "02",
  };
  await push(usersDBRef, newUser);

  return newUser;
};
