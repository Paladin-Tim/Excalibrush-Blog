import { db } from "../../firebase";
import { ref, get } from "firebase/database";

const usersDBRef = ref(db, "users");

export const getUser = async (loginToFind) => {
  let user = {};

  await get(usersDBRef).then((snapshot) => {
    let users = Object.values(snapshot.val());
    user = users.find(({ login }) => login === loginToFind);
  });

  return user;
};
