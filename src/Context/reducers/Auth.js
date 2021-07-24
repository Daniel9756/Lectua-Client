import { REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "../actions/ActionTypes";

const auth = (state, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          isCreatingUser: true,
          error: false,
          isAuthenticated: false,
          isError: false,
          user: null
        },
      };
      case REGISTER_SUCCESS:
        return {
          ...state,
          auth: {
            ...state.auth,
            isCreatingUser: false,
            error: false,
            isAuthenticated: true,
            user: action.payload,
            isError: false,
          },
        }; 
      case REGISTER_ERROR:
        return {
          ...state,
          auth: {
            ...state.auth,
            isCreatingUser: false,
            isAuthenticated: false,
            error: action.payload,
            isError: true,
            user: null

          },
        };
    default:
      return state;
  }
};

export default auth;