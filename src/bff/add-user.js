import { db } from "../firebase";
import { ref, push } from "firebase/database";

const usersDBRef = ref(db, "users");

export const addUser = (login, password) => {
  push(usersDBRef, {
    login,
    password,
    registred_at: Date.now().toLocaleString(),
    role_id: "02",
  });
};
