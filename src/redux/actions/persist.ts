import { switchLanguage } from "../../I18n";
import { Dispatch, GetState } from "../types";

export const CHOOSE_LANGUAGE = "CHOOSE_LANGUAGE";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const SAVE_SCORE = "SAVE_SCORE";

export const chooseLanguage = (data: string) => (dispatch: Dispatch) => {
  switchLanguage(data);
  dispatch({ type: CHOOSE_LANGUAGE, payload: { data } });
};

export const handleLogin = (username: string) => (dispatch: Dispatch) => {
  dispatch({ type: HANDLE_LOGIN, payload: { data: username } });
};

export const saveScore = (value: number) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const { username } = getState().persist;

  dispatch({
    type: SAVE_SCORE,
    payload: {
      data: {
        username,
        score: value,
      },
    },
  });
};
