import { panelData } from "../actionType/actionType";

const initialState = {
  fileData: false,
};
const commonReducer = (state = initialState, action) => {
  switch (action.type) {
      case panelData.fileData:
      return {
        ...state,
        fileData: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
