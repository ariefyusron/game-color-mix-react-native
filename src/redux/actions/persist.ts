import { Dispatch, GetState } from "../types";

export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const SAVE_SCORE = "SAVE_SCORE";

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
