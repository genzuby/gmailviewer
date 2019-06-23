import { SIGN_IN, SIGN_OUT, FETCH_LIST } from "./types";
import { loadGmailApi } from "../api/loadGmailApi";

export const signIn = userInfo => {
  return {
    type: SIGN_IN,
    payload: userInfo
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const fetchList = () => async dispatch => {
  const response = await loadGmailApi;
  dispatch({ type: FETCH_LIST, payload: response.data });
};
