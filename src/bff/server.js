// import { db } from "../firebase.js";
// import { ref, onValue, get, update, remove, push } from "firebase/database";
import { getUser } from "./get-user.js";
import { addUser } from "./add-user.js";
// import { createSession } from "./create-session.js";
import { sessions } from "./sessions.js";

//const usersDBRef = ref(db, "users");

export const server = {
  async authorize(authLogin, authPassword) {
    const user = await getUser(authLogin);

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
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(user),
      },
    };
  },

  async register(regLogin, regPassword) {
    const user = await getUser(regLogin);

    if (user) {
      return {
        error: "This login is already in use!",
        res: null,
      };
    }

    await addUser(regLogin, regPassword);

    return {
      error: null,
      res: {
        id: user.id,
        login: user.login,
        roleId: user.role_id,
        session: sessions.create(user),
      },
    };
  },
  logout(session) {
    sessions.remove(session);
  },
};
