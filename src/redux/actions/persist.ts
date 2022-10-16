import { switchLanguage } from "../../I18n";
import { Dispatch } from "../types";

export const CHOOSE_LANGUAGE = "CHOOSE_LANGUAGE";
export const HANDLE_LOGIN = "HANDLE_LOGIN";

export const chooseLanguage = (data: string) => (dispatch: Dispatch) => {
  switchLanguage(data);
  dispatch({ type: CHOOSE_LANGUAGE, payload: { data } });
};

export const handleLogin = (username: string) => (dispatch: Dispatch) => {
  dispatch({ type: HANDLE_LOGIN, payload: { data: username } });
};
