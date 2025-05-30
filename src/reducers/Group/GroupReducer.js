import * as ActionTypes from '../../actions/ActionTypes';

const initialState = {
  contactList: [],
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COTACT_LIST:
      return {
        ...state,
        contactList: action.data,
      };

    default:
      return state;
  }
};

export default GroupReducer;
