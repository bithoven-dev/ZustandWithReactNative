import create from 'zustand';

import {get} from '../utils/get';

export const useProductsStore = create(set => ({
  fetchProducts: async () => {
    set({products: await get('/products')});
  },
  products: [],
}));
