import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_GET_STATUS,
  AUTH_GET_STATUS_SUCCESS,
  AUTH_GET_STATUS_FAILURE,
  AUTH_LOGOUT
} from './ActionTypes';

/* LOGIN */
export function loginRequest(email, password) {
  return (dispatch) => {
      // Inform Login API is starting
      dispatch({
        type: AUTH_LOGIN
      });

      // API REQUEST
      return axios.post('/api/account/signin', { email, password })
      .then((response) => {
          // SUCCEED
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            email,
            user_id: response.data.user_id
          });
      }).catch((error) => {
          // FAILED
          dispatch({
            type: AUTH_LOGIN_FAILURE
          });
      });
  };
}

/* REGISTER */
export function registerRequest(email, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch({
          type: AUTH_REGISTER
        });

        return axios.post('/api/account/signup', { email, password })
        .then((response) => {
            dispatch({
              type: AUTH_REGISTER_SUCCESS
            });
        }).catch((error) => {
            dispatch({
              type: AUTH_REGISTER_FAILURE,
              error: error.response.data.code
            });
        });
    };
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch({
          type: AUTH_GET_STATUS
        });

        return axios.get('/api/account/getInfo')
        .then((response) => {
          // thnunk 함수에 문제 없음
          // console.log(response.data.info);
            dispatch({
              type: AUTH_GET_STATUS_SUCCESS,
              email: response.data.info.email,
              user_id: response.data.info._id
            });
        }).catch((error) => {
            dispatch({
              type: AUTH_GET_STATUS_FAILURE
            });
        });
    };
}

/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch({
              type: AUTH_LOGOUT
            });
        });
    };
}
