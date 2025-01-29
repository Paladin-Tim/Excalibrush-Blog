import { ROLE } from "./constants";
import { removeComment } from "./session-methods";

export const createSession = (roleId) => {
  const session = {
    logOut() {
      Object.keys(session).forEach((key) => delete session[key]);
    },
  };

  switch (roleId) {
    case ROLE.ADMIN:
      session.removeComment = removeComment;
      break;
    case ROLE.MODER:
      session.removeComment = removeComment;
      break;
    case ROLE.GUEST:
      break;
    default:
    // do nothing...
  }

  return session;
};
