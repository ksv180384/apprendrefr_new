import { defineStore } from 'pinia';
import { page } from '@/services/api/query.js';

const defaultState = {
  title: '',
  description: '',
  data: null,
  loading: false,
}

export const usePageStore = defineStore('page', {
  state: () => {
    return { ...defaultState }
  },
  actions: {
    async loadPage(path) {
      this.loading = true;
      try{
        const res = await page(path);
        this.title = res.title || defaultState.title;
        this.description = res.description || defaultState.description;
        this.data = res.data || defaultState.data;
        return res;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
})
