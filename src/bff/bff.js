// import { db } from "../firebase.js";
// import { ref, onValue, get, update, remove, push } from "firebase/database";
import { getUser } from "./get-user.js";
import { addUser } from "./add-user.js";
import { createSession } from "./create-session.js";

//const usersDBRef = ref(db, "users");

export const server = {
  authorize(authLogin, authPassword) {
    const user = getUser(authLogin);

    if (!user) {
      return {
        error: "No such user!",
        res: null,
      };
    } else if (authPassword !== user.password) {
      return {
        error: "Wrong password!",
        res: null,
      };
    }

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },

  register(regLogin, regPassword) {
    const user = getUser(regLogin);

    if (user) {
      return {
        error: "This login is already in use!",
        res: null,
      };
    }

    addUser(regLogin, regPassword);

    return {
      error: null,
      res: createSession(user.role_id),
    };
  },
};
