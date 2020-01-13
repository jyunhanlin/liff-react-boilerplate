/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from 'react';

const liff = window.liff;
const liffId = process.env.REACT_APP_LIFF_ID;

export const liffContext = createContext();

export function ProvideLiff({ children }) {
  const liffHook = useLiff();
  const [liffProfile, setLiffProfile] = useState();
  useEffect(() => {
    const getLiffProfile = async () => {
      if (liffHook && !liffProfile) {
        const profile = await liffHook.getProfile();
        setLiffProfile(profile);
      }
    };
    getLiffProfile();
  }, [liffHook, liffProfile]);
  return (
    <liffContext.Provider value={{ ...liffHook, liffProfile }}>{children}</liffContext.Provider>
  );
}

export function useLiff() {
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
