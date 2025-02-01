import { ROLE } from "../../bff/constants";
import { ACTION_TYPES } from "../actions/action-types";

const initialState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_USER:
      return { ...state, ...payload };
    case ACTION_TYPES.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
