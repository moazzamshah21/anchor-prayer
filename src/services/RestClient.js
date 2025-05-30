import axios from 'axios';
import {API_KEY, BASE_URL} from '../utils/Config';
import LocalStorage from '../utils/LocalStorage';
import {showMessage} from 'react-native-flash-message';
import store from '../store/Store';
import {showLoader, hideLoader} from '../actions/Common/CommonAction';

const axiosInstance = token =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'x-api-key': API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

const Get = async (host, loader = true) => {
  if (loader) {
    store.dispatch(showLoader());
  }
  console.log(`${BASE_URL}${host}`);
  var token = await LocalStorage.GetData('token');
  return axiosInstance(token)
    .get(host)
    .then(response => {
      store.dispatch(hideLoader());
      return response.data;
    })
    .catch(async error => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === 'Unauthorized - Session Expired'
        ) {
          await LocalStorage.SetData('token', error.response.data.newToken);
          return await Get(host, loader);
        } else {
          store.dispatch(hideLoader());
          return error.response.data;
        }
      } else {
        store.dispatch(hideLoader());
        showMessage({
          message: 'Some thing went wrong. Please try again',
          type: 'danger',
        });
      }
    });
};

const Post = async (host, payload, loader = true) => {
  if (loader) {
    store.dispatch(showLoader());
  }
  console.log(`${BASE_URL}${host}`);
  var token = await LocalStorage.GetData('token');
  return axiosInstance(token)
    .post(host, payload, {
      onDownloadProgress: progressEvent => {
        //const currentProgress = (progressEvent.loaded / progressEvent.total) * 100;
        //console.log("onDownloadProgress:", currentProgress);
      },
      onUploadProgress: progressEvent => {
        //const currentProgress = (progressEvent.loaded / progressEvent.total) * 100;
        //console.log("onUploadProgress:", currentProgress);
      },
    })
    .then(response => {
      store.dispatch(hideLoader());
      return response.data;
    })
    .catch(async error => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === 'Unauthorized - Session Expired'
        ) {
          await LocalStorage.SetData('token', error.response.data.newToken);
          return await Post(host, payload, loader);
        } else {
          store.dispatch(hideLoader());
          return error.response.data;
        }
      } else {
        store.dispatch(hideLoader());
        showMessage({
          message: 'Some thing went wrong. Please try again',
          type: 'danger',
        });
      }
    });
};

const Put = async (host, payload, loader = true) => {
  if (loader) {
    store.dispatch(showLoader());
  }
  console.log(`${BASE_URL}${host}`);
  var token = await LocalStorage.GetData('token');
  return axiosInstance(token)
    .put(host, payload)
    .then(response => {
      store.dispatch(hideLoader());
      return response.data;
    })
    .catch(async error => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === 'Unauthorized - Session Expired'
        ) {
          await LocalStorage.SetData('token', error.response.data.newToken);
          return await Put(host, payload, loader);
        } else {
          store.dispatch(hideLoader());
          return error.response.data;
        }
      } else {
        store.dispatch(hideLoader());
        showMessage({
          message: 'Some thing went wrong. Please try again',
          type: 'danger',
        });
      }
    });
};

const Delete = async (host, loader = true) => {
  if (loader) {
    store.dispatch(showLoader());
  }
  console.log(`${BASE_URL}${host}`);
  var token = await LocalStorage.GetData('token');
  return axiosInstance(token)
    .delete(host)
    .then(response => {
      store.dispatch(hideLoader());
      return response.data;
    })
    .catch(async error => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === 'Unauthorized - Session Expired'
        ) {
          await LocalStorage.SetData('token', error.response.data.newToken);
          return await Delete(host, loader);
        } else {
          store.dispatch(hideLoader());
          return error.response.data;
        }
      } else {
        store.dispatch(hideLoader());
        showMessage({
          message: 'Some thing went wrong. Please try again',
          type: 'danger',
        });
      }
    });
};

export default {Get, Post, Put, Delete};
