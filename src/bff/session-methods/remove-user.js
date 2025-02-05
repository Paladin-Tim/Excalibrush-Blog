import { deleteUser } from "../api";

export const removeUser = async (userId) => {
  await deleteUser(userId);

  return {
    error: null,
    res: {
      id: userId,
    },
  };
};
