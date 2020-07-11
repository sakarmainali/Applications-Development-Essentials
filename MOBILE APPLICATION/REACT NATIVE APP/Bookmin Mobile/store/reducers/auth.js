import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  uname:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        uname:action.uname
      };
    case LOGOUT:
      return initialState;
    
    default:
      return state;
  }
};
