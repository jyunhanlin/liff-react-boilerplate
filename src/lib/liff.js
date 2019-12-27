/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const liff = window.liff;

function useLiffProfile(liffId) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getLiffProfile = async () => {
      await liff.init({ liffId });
      if (liff.isLoggedIn()) {
        const newProfile = await liff.getProfile();
        setProfile(newProfile);
      } else {
        liff.login();
      }
    };

    getLiffProfile();
  }, []);

  return profile;
}

export default useLiffProfile;
