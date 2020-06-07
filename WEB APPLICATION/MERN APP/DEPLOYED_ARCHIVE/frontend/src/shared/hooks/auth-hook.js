import { useState, useCallback, useEffect } from 'react';
import React, {useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
let logoutTimer;
let uname;
let img;
let ns;

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  

  const login = useCallback((uid, token,user,image,nsum, expirationDate) => {
    setToken(token);
    setUserId(uid);
    auth.username=user;
    auth.pimg=image;
    img=String(image);
    console.log("hahah");
    console.log(user);
    console.log(auth.username);
    uname=String(user);
    ns=String(nsum);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        user:user,
        image:image,
        nsum:nsum,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout,uname,img,ns, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token,storedData.user,storedData.image,storedData.nsum, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout, userId , uname,img,ns };
};
