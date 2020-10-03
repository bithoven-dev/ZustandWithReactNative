import React from 'react';
import SecureStorage from 'react-native-secure-storage';

import {sleep} from '../utils/sleep';
import {useUserStore} from '../stores/userStore';

export function useAuth() {
  const auth = useUserStore(({login, register, logout}) => ({
    login,
    register,
    logout,
  }));
  const state = useUserStore(({loading, user}) => ({loading, user}));
  const [setLoading, setUser] = useUserStore(state => [
    state.setLoading,
    state.setUser,
  ]);
  React.useEffect(() => {
    sleep(2000).then(() => {
      SecureStorage.getItem('user').then(user => {
        if (user) {
          setUser(JSON.parse(user));
        }
        setLoading(false);
      });
    });
  }, [setLoading, setUser]);
  return {auth, state};
}
