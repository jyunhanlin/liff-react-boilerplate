/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, createContext } from 'react';

const liff = window.liff;
const liffId = process.env.REACT_APP_LIFF_ID;

export const liffContext = createContext();

export function ProviderLiff({ children }) {
  const liffHook = useLiff();
  const [liffProfile, setLiffProfile] = useState();
  useEffect(() => {
    const getLiffProfile = async () => {
      if (liffHook && !liffProfile) {
        try {
          const profile = await liffHook.getProfile();
          setLiffProfile(profile);
        } catch (e) {
          console.log(e);
        }
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
    throw new Error('please login your line account first');
  };

  const getDecodedIDToken = async () => {
    if (liff.isLoggedIn()) return await liff.getDecodedIDToken();
    throw new Error('please login your line account first');
  };

  return initDone
    ? {
        liff,
        login,
        getProfile,
        getDecodedIDToken,
      }
    : null;
}
