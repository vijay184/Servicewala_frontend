export const setRequestStatus = (pendingID, status) => {
    return {
      type: 'SET_REQUEST_STATUS',
      payload: {
        pendingID,
        status,
      },
    };
  };

  export const removePending = (pendingID) => {
    return {
      type: 'REMOVE_PENDING',
      payload: pendingID,
    };
  };
