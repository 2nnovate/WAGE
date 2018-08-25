import * as types from '../actions/ActionTypes';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: []
    },
    oneStore: {
        status: 'INIT',
        data: {}
    },
    edit: {
        status: 'INIT',
        error: -1,
    },
    remove: {
        status: 'INIT',
        error: -1
    },
    order: {
      status: 'INIT',
      error: -1,
      success: false
    },
    savedStore: {
        status: 'INIT',
        error: -1,
        has_saved: false
    },
    review: {
        status: 'INIT',
        error: -1
    },
    reviewEdit: {
        status: 'INIT',
        error: -1
    }
};

export default function store(state = initialState, action) {
  switch(action.type) {
    case types.STORE_REGISTER:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'WAITING',
            error: -1
          }
        };
    case types.STORE_REGISTER_SUCCESS:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'SUCCESS'
          }
        };
    case types.STORE_REGISTER_FAILURE:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.GET_ALL_STORES:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'WAITING',
            error: -1
          }
        };
    case types.GET_ALL_STORES_SUCCESS:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data
          }
        };
    case types.GET_ALL_STORES_FAILURE:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'FAILURE',
            error: action.error
          }
        };
    default:
        return state;
  }
}
