import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useServer } from "../../hooks";
import { getUsers } from "../../redux/actions";
import { selectUsersList } from "../../redux/selectors";
import { UserRow } from "./user-row/user-row";
import { ROLE } from "../../bff/constants";
import "./users.scss";

export const UsersPage = () => {
  const [roles, setRoles] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const usersList = useSelector(selectUsersList);

  const dispatch = useDispatch();

  const requestServer = useServer();

  useEffect(() => {
    Promise.all([
      requestServer("fetchUsers"),
      requestServer("fetchRoles"),
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      dispatch(getUsers(usersRes.res));
      setRoles(rolesRes.res[0]);
    });
  }, [dispatch, requestServer]);

  return (
    <article className="usersTab__wrapper">
      {errorMessage ? (
        <>
          <h3>Server error</h3>
          <section>{errorMessage}</section>
        </>
      ) : (
        <>
          <h3>Users</h3>
          <article className="usersTab">
            <section className="usersTab__header">
              <div className="usersTab__colHeader">User name (login)</div>
              <div className="usersTab__colHeader">Registartion date</div>
              <div className="usersTab__colHeader">Role</div>
            </section>
            {Object.values(usersList).map(
              ({ id, login, registred_at, role_id }) => (
                <UserRow
                  key={id}
                  id={id}
                  login={login}
                  registredAt={registred_at}
                  roleId={role_id}
                  roles={Object.values(roles).filter(
                    ({ id }) => id !== ROLE.GUEST,
                  )}
                />
              ),
            )}
          </article>
        </>
      )}
    </article>
  );
};
