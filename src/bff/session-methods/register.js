import { sessions } from "../sessions";
import { getUser, addUser } from "../api";

export const register = async (regLogin, regPassword) => {
  const existedUser = await getUser(regLogin);

  if (existedUser) {
    return {
      error: "This login is already in use!",
      res: null,
    };
  }

  const user = await addUser(regLogin, regPassword);

  // const { id, login, role_id, registred_at } = user;

  return {
    error: null,
    res: {
      ...user,
      session: sessions.create(user),
    },
  };
};
