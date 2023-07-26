const initialState = {};

const requestStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REQUEST_STATUS":
      return {
        ...state,
        [action.payload.pendingID]: action.payload.status,
      };
    case "REMOVE_PENDING":
      const { [action.payload]: _, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default requestStatusReducer;
