import { CHOOSE_LANGUAGE, HANDLE_LOGIN, SAVE_SCORE } from "../actions";
import { Action, PersistState } from "../types";

const initialState: PersistState = {
  language: "",
  username: "",
  listScore: [],
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case CHOOSE_LANGUAGE:
      return { ...state, language: payload.data };
    case HANDLE_LOGIN:
      return { ...state, username: payload.data };
    case SAVE_SCORE:
      return { ...state, listScore: [...state.listScore, payload.data] };
    default:
      return state;
  }
};
