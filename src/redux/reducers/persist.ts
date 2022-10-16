import { HANDLE_LOGIN, SAVE_SCORE } from "../actions";
import { Action, PersistState } from "../types";

const initialState: PersistState = {
  username: "",
  listScore: [],
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case HANDLE_LOGIN:
      return { ...state, username: payload.data };
    case SAVE_SCORE:
      return { ...state, listScore: [...state.listScore, payload.data] };
    default:
      return state;
  }
};
