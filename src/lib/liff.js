/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const liff = window.liff;
const liffId = process.env.REACT_APP_LIFF_ID;

function useLiff() {
  const [initDone, setInit] = useState(false);
  useEffect(() => {
    const liffInit = async () => {
      try {
        await liff.init({ liffId });
        setInit(true);
      } catch (e) {
        console.log('please fill in your liff id');
      }
    };
    liffInit();
  }, []);

  const login = redirectUri => {
    const loginConfig = {};
    if (redirectUri) loginConfig.redirectUri = redirectUri;
    liff.login(loginConfig);
  };

  const getProfile = async () => {
    if (liff.isLoggedIn()) return await liff.getProfile();
    return login();
  };

  const getDecodedIDToken = async () => {
    if (liff.isLoggedIn()) return await liff.getDecodedIDToken();
    return login();
  };

  return initDone
    ? {
        login,
        getProfile,
        getDecodedIDToken,
      }
    : null;
}

export default useLiff;
