import { panelData } from "../actionType/actionType";

export const toggleHandler = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: panelData.fileData,
      payload: data,
    });
  });
};
