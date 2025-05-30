import PrayerService from '../../services/Prayer/PrayerService';
import * as ActionTypes from '../ActionTypes';

export const showLoader = text => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.SHOW_LOADER,
      loading: true,
    });
  };
};

export const hideLoader = text => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.HIDE_LOADER,
      loading: false,
    });
  };
};

export const fetchMyPrayers = () => {
  return (dispatch, getState) => {
    PrayerService.GetMyPrayers().then(response => {
      if (response?.success) {
        dispatch({
          type: ActionTypes.MY_PRAYERS_LIST,
          data: response?.data,
        });
      }
    });
  };
};

export const fetchMyAchivedPrayers = () => {
  return (dispatch, getState) => {
    PrayerService.GetMyAchivedPrayers().then(response => {
      if (response?.success) {
        dispatch({
          type: ActionTypes.MY_ACHIVED_PRAYERS_LIST,
          data: response?.data,
        });
      }
    });
  };
};

export const fetchMyAnsweredPrayers = () => {
  return (dispatch, getState) => {
    PrayerService.GetMyAnsweredPrayers().then(response => {
      if (response?.success) {
        dispatch({
          type: ActionTypes.MY_ANSWERED_PRAYERS_LIST,
          data: response?.data,
        });
      }
    });
  };
};
