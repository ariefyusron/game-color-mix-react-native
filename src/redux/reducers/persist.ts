import { CHOOSE_LANGUAGE, HANDLE_LOGIN } from "../actions";
import { Action, PersistState } from "../types";

const initialState: PersistState = {
  language: "",
  username: "",
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case CHOOSE_LANGUAGE:
      return { ...state, language: payload.data };
    case HANDLE_LOGIN:
      return { ...state, username: payload.data };
    default:
      return state;
  }
};
