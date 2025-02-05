import { db } from "../../firebase";
import { ref, get } from "firebase/database";

const rolesDBRef = ref(db, "roles");

export const getRoles = async () => {
  let roles = [];

  await get(rolesDBRef).then((snapshot) => {
    roles.push(snapshot.val());
  });

  return roles;
};
