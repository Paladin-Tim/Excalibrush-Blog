import { getUsers } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const fetchUsers = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];
  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: "Access denied!",
      res: null,
    };
  }

  const users = await getUsers();

  return {
    error: null,
    res: users,
  };
};
