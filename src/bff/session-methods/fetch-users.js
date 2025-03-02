import { getUsers } from "../api";
import { ROLE, globalErrors } from "../constants";
import { sessions } from "../sessions";

export const fetchUsers = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: globalErrors.ACCESS_DENIED,
      res: null,
    };
  }

  const users = await getUsers();

  return {
    error: null,
    res: users,
  };
};
