import { DO_NOTHING } from "../redux-constants.js";

export const testReduxAction = (someValue) => {
  return { type: DO_NOTHING, payload: someValue };
};