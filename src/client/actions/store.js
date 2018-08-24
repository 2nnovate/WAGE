import axios from 'axios';
import {
  STORE_REGISTER,
  STORE_REGISTER_SUCCESS,
  STORE_REGISTER_FAILURE
} from './ActionTypes';

/* REGISTER */
export function registerStoreRequest(storeInfromObj) {
    return (dispatch) => {
        dispatch({
          type: STORE_REGISTER
        });

        return axios.post('/api/store/register', storeInfromObj)
        .then((response) => {
            dispatch({
              type: STORE_REGISTER_SUCCESS
            });
        }).catch((error) => {
            dispatch({
              type: STORE_REGISTER_FAILURE,
              error: error.response.data.code
            });
        });
    };
}

// /* GET STORES */
// /*
//     Parameter:
//         - region: 배달지역
//         - categories: 가져올 가게의 업종
//         - sort: 정렬 순서 (디폴트 값은 _id로 하기)
//         - owner: 사장님의 가게 목록 요청시 (true/fasle)
//         - user_id: 사장님이 목록 요청할 때 사장님의 _id
// */
// export function storeListRequest(region, categories, sort="deliveryTime", owner, user_id) {
//     return (dispatch) => {
//         // 사장님의 요청이냐, 유저의 요청이냐를 먼저 구분(sort 를 통해)
//         dispatch({
//           type: STORE_LIST
//         });
//
//         let url = '/api/store';
//
//         if(typeof owner==="undefined") {
//             // 유저의 요청
//             url = `${url}/${region}/${categories}/${sort}`;
//         } else {
//           // 사장님의 요청
//           url = `${url}/owner/${user_id}`;
//         }
//         // console.log(url)
//
//         return axios.get(url)
//         .then((response) => {
//             dispatch({
//               type: STORE_LIST_SUCCESS,
//               data: response.data
//             });
//         }).catch((error) => {
//             dispatch({
//               type: STORE_LIST_FAILURE
//             });
//         });
//     };
// }
// /*
//   GET one store(상세보기)
//   파라메터는 store 의 _id 값
// */
// export function storeOneRequest(store_id) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_ONE
//     });
//
//     let url = '/api/store/'+store_id;
//
//     return axios.get(url)
//     .then((response) => {
//       // console.log(response);
//         dispatch({
//           type: STORE_ONE_SUCCESS,
//           data: response.data
//         });
//     }).catch((error) => {
//         dispatch({
//           type: STORE_ONE_FAILURE
//         });
//     });
//   }
// }
//
// /*
//   store 정보수정
//   parameters-
//     level: 수정의 url 를 결정 one, two, three 총 세개
//     store_id: 수정할 메모의 _id
//     contents: 수정할 내용 (객체- 수정할 필드만을 가지고 있는!)
//     *단계에 따라 필드가 다르다.
// */
// export function editStoreRequest(level, store_id, contents) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_EDIT
//     });
//
//     let url = '/api/store';
//     switch(level){
//       case "one":
//         url = `${url}/edit_one/${store_id}`;
//         break;
//       case "two":
//         url = `${url}/edit_two/${store_id}`;
//         break;
//       case "three":
//         url = `${url}/edit_three/${store_id}`;
//         break;
//       default:
//         url;
//     }
//     return axios.put(url, contents)
//     .then((response)=>{
//       dispatch({
//         type: STORE_EDIT_SUCCESS,
//         store: response.data.store
//       })
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_EDIT_FAILURE,
//         error: error.response.data.code
//       })
//     })
//   }
// }
//
// /* 찜하기 */
// export function savedStoreRequest(store_id) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_SAVE
//     });
//
//     let url = '/api/store/savestore/'+store_id;
//
//     return axios.post(url)
//     .then((response)=>{
//       dispatch({
//         type: STORE_SAVE_SUCCESS,
//         has_saved: response.data.has_saved
//       })
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_SAVE_FAILURE,
//         error: error.response.data.code
//       })
//     })
//   }
// }
//
// /* 찜한 가게 보기 */
// export function getsavedStoreRequest(username) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_SAVE_RETRIEVE
//     });
//
//     let url = '/api/store/mysavestore/'+username;
//
//     return axios.get(url)
//     .then((response)=>{
//       dispatch({
//         type: STORE_SAVE_RETRIEVE_SUCCESS,
//         data: response.data
//       })
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_SAVE_RETRIEVE_FAILURE,
//         error: error.response.data.code
//       })
//     })
//   }
// }
//
// /* 주문 */
// export function orderStoreRequest(store_id) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_ORDER
//     });
//
//     let url = '/api/store/order/'+store_id;
//     console.log(url)
//
//     return axios.post(url)
//     .then((response)=>{
//       if(response.data.success===true){
//         console.log("time to dispatch success");
//         dispatch({
//           type: STORE_ORDER_SUCCESS,
//           success: response.data.success
//         });
//       }
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_ORDER_FAILURE,
//         error: error.response.data.code
//       });
//     })
//   }
// }
//
// /* 리뷰남기기 */
// export function reviewRequest(store_id, obj) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_REVIEW
//     });
//
//     let url = '/api/store/review/'+store_id;
//
//     return axios.post(url, obj)
//     .then((response)=>{
//         dispatch({
//           type: STORE_REVIEW_SUCCESS
//         });
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_REVIEW_FAILURE,
//         error: error.response.data.code
//       });
//     })
//   }
// }
//
// /* 리뷰 수정하기 */
// export function reviewEditRequest(store_id, nth_index, obj) {
//   return (dispatch) => {
//     dispatch({
//       type: STORE_EDIT_REVIEW
//     });
//
//     let url = '/api/store/review_edit/'+store_id+'/'+nth_index;
//
//     return axios.put(url, obj)
//     .then((response)=>{
//         dispatch({
//           type: STORE_EDIT_REVIEW_SUCCESS
//         });
//     }).catch((error)=>{
//       dispatch({
//         type: STORE_EDIT_REVIEW_FAILURE,
//         error: error.response.data.code
//       });
//     })
//   }
// }
