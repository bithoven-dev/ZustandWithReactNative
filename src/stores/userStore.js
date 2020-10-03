import create from 'zustand';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

import {BASE_URL} from '../config';
import {sleep} from '../utils/sleep';

export const useUserStore = create(set => ({
  login: async (email, password) => {
    const {data} = await axios.post(`${BASE_URL}/auth/local`, {
      identifier: email,
      password,
    });
    const user = {
      email: data.user.email,
      token: data.jwt,
    };
    await SecureStorage.setItem('user', JSON.stringify(user));
    set({user});
  },
  logout: async () => {
    await SecureStorage.removeItem('user');
    set({user: undefined});
  },
  register: async (email, password) => {
    await sleep(2000);
    await axios.post(`${BASE_URL}/auth/local/register`, {
      username: email,
      email,
      password,
    });
  },
  setUser: user => set({user}),
  setLoading: loading => set({loading}),
  user: undefined,
  loading: true,
}));
