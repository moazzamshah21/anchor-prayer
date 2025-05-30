import * as ActionTypes from '../../actions/ActionTypes';

const initialState = {
  loading: false,
  myPrayerList: [],
  myAnsweredPrayerList: [],
  myArchivedPrayerList: [],
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.HIDE_LOADER:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.MY_PRAYERS_LIST:
      return {
        ...state,
        myPrayerList: action.data,
      };
    case ActionTypes.MY_ACHIVED_PRAYERS_LIST:
      return {
        ...state,
        myArchivedPrayerList: action.data,
      };
    case ActionTypes.MY_ANSWERED_PRAYERS_LIST:
      return {
        ...state,
        myAnsweredPrayerList: action.data,
      };
    default:
      return state;
  }
};

export default CommonReducer;
