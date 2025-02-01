import { db } from "../firebase";
import { ref, get } from "firebase/database";

const usersDBRef = ref(db, "users");

export const getUser = async (loginToFind) => {
  let user = {};
  await get(usersDBRef).then((snapshot) => {
    user = snapshot.val().find(({ login }) => login === loginToFind);
  });
  return user;
};
