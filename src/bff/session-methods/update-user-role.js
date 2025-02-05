import { setUserRole } from "../api";
// import { sessions } from "../sessions";
// import { ROLE } from "../constants";

export const updateUserRole = async (userId, userNewRoleId) => {
  //   const accessRoles = [ROLE.ADMIN];

  //   if (!sessions.access(userSession, accessRoles)) {
  //     return {
  //       error: "Access denied!",
  //       res: null,
  //     };
  //   }

  await setUserRole(userId, userNewRoleId);

  return {
    error: null,
    res: {
      id: userId,
      roleId: userNewRoleId,
    },
  };
};
