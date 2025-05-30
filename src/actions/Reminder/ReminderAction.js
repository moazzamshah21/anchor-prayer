import * as ActionTypes from '../ActionTypes';

export const getContactList = data => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.COTACT_LIST,
      data: data,
    });
  };
};
