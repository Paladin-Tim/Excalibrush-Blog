import { db } from "../firebase";
import { ref, get } from "firebase/database";

const usersDBRef = ref(db, "users");

export const getUser = (loginToFind) => {
  get(usersDBRef).then((snapshot) => {
    return snapshot.val().find(({ login }) => login === loginToFind);
  });
};
