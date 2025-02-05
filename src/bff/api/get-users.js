import { db } from "../../firebase";
import { ref, get } from "firebase/database";

const usersDBRef = ref(db, "users");

export const getUsers = async () => {
  let users = {};

  await get(usersDBRef).then((snapshot) => {
    users = snapshot.val();
  });
  return users;
};
