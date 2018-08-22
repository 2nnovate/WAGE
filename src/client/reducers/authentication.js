import * as types from '../actions/ActionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false, //세션이 유효한지 체크, 유효하면 true, 만료/비정상 false
        isLoggedIn: false,
        currentUser: '',
        currentUser_id: ''
    }
};

export default function authentication(state = initialState, action) {
  switch(action.type) {
      /* LOGIN */
      case types.AUTH_LOGIN:
          return {
            ...state,
            login : {
              status: 'WAITING'
            }
          }
      case types.AUTH_LOGIN_SUCCESS:
          return {
            ...state,
            login: {
                status: 'SUCCESS'
            },
            status: {
              ...state.status,
              isLoggedIn: true,
              currentUser: action.email,
              currentUser_id: action.user_id
            }
          }
      case types.AUTH_LOGIN_FAILURE:
          return {
            ...state,
            login:{
              status: 'FAILURE'
            }
          }
      /* REGISTER */
      case types.AUTH_REGISTER:
            return {
              ...state,
              register: {
                status: 'WAITING',
                error: -1
              }
            }
      case types.AUTH_REGISTER_SUCCESS:
          return {
            ...state,
            register: {
              ...state.register,
              status: 'SUCCESS'
            }
          }
      case types.AUTH_REGISTER_FAILURE:
          return {
            ...state,
            register:{
              status: 'FAILURE',
              error: action.error
            }
          }
      default:
          return state;
  }
}
