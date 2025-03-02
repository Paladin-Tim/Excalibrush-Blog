import { getRoles } from "../api/get-roles";
import { ROLE, globalErrors } from "../constants";
import { sessions } from "../sessions";

export const fetchRoles = async (userSession) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(userSession, accessRoles)) {
    return {
      error: globalErrors.ACCESS_DENIED,
      res: null,
    };
  }

  const roles = await getRoles();

  return {
    error: null,
    res: roles,
  };
};
