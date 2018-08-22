import axios from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE
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

// /* GET STATUS */
// export function getStatusRequest() {
//     return (dispatch) => {
//         // inform Get Status API is starting
//         dispatch({
//           type: AUTH_GET_STATUS
//         });
//
//         return axios.get('/api/account/getInfo')
//         .then((response) => {
//             dispatch({
//               type: AUTH_GET_STATUS_SUCCESS,
//               username: response.data.info.username,
//               user_id: response.data.info._id,
//               region: response.data.info.region,
//               account: response.data.info.account
//             });
//         }).catch((error) => {
//             dispatch({
//               type: AUTH_GET_STATUS_FAILURE
//             });
//         });
//     };
// }
//
// /* Logout */
// export function logoutRequest() {
//     return (dispatch) => {
//         return axios.post('/api/account/logout')
//         .then((response) => {
//             dispatch({
//               type: AUTH_LOGOUT
//             });
//         });
//     };
// }
//
// /* edit region */
// export function editRegionRequest(_id, region) {
//   return (dispatch) => {
//     dispatch({
//       type: AUTH_EDIT_REGION
//     });
//
//     let url = '/api/account/editregion/'+_id;
//
//     return axios.put(url, { region })
//     .then((response) => {
//         dispatch({
//           type: AUTH_EDIT_REGION_SUCCESS,
//           region: response.data.account.region
//         });
//     }).catch((error) => {
//         dispatch({
//           type: AUTH_EDIT_REGION_FAILURE,
//           error: error.response.data.code
//         });
//     });
//   }
// }
//
// /* order */
// export function orderRequest(user_id, obj) {
//   return (dispatch) => {
//     dispatch({
//       type: AUTH_ORDER
//     });
//
//     let url = '/api/account/order/'+user_id
//     return axios.post(url, obj)
//     .then((response) => {
//         dispatch({
//           type: AUTH_ORDER_SUCCESS
//         });
//     }).catch((error) => {
//         dispatch({
//           type: AUTH_ORDER_FAILURE,
//           error: error.response.data.code
//         });
//     });
//   }
// }
