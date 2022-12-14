// Action
interface Payload {
  data?: any;
}

interface Params {
  type: string;
  payload?: Payload;
}

export type Dispatch = (params: Params | Function) => void;
export type GetState = () => Reducers;

export interface Action {
  type: string;
  payload: Payload;
}

// Reducer
export interface Reducers {
  persist: PersistState;
}

interface Score {
  username: string;
  score: number;
}

export interface PersistState {
  username: string;
  listScore: Score[];
}
