import { sessions } from "../sessions";
import { getUser } from "../api/get-user";

export const authorize = async (authLogin, authPassword) => {
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
      ...user,
      session: sessions.create(user),
    },
  };
};
