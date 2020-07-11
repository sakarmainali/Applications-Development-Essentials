import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token,uname, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token ,uname:uname});
  };
};

//signup
export const signup = (email, password,name) => {

  
  
  return async dispatch => {

    const response = await fetch(
      'https://book-min.herokuapp.com/api/users/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name:name,
          password: password,
        })
      }
    );

  
    



    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.status;
      let message = 'Something went wrong';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    

    dispatch(
      authenticate(
        resData.userId,
        resData.token,
        name,
        parseInt('3600') * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt('3600') * 1000
    );
    saveDataToStorage(resData.token, resData.userId, name, expirationDate);
  };
};

//login

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://book-min.herokuapp.com/api/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
          
        })
      }
    );

    console.log(response);
    console.log(response.ok);

    

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.statusText;
      let message = 'Invalid Credentials passed !! Please enter correct email and password';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();


    console.log(resData);
    console.log("********************************************************");
    
    dispatch(
      authenticate(
        resData.userId,
        resData.token,
        resData.name,
        parseInt('3600') * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt('3600') * 1000
    );
    saveDataToStorage(resData.token, resData.userId,resData.name, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, uname, expirationDate) => {
  
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      uname:uname,
      expiryDate: expirationDate.toISOString()
    })
  );
};
