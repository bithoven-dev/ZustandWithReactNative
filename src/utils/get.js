import axios from 'axios';

import {useUserStore} from '../stores/userStore';
import {BASE_URL} from '../config';

export const get = async endpoint => {
  const {token} = useUserStore.getState().user;
  const {data} = await axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return data;
};
