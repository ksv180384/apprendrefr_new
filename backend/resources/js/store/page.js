import { defineStore } from 'pinia'
import { page } from '@/services/api/query.js';

const defaultState = {
    auth: false,
    title: '',
    description: '',
    footer: [],
    proverb: {},
    statistic: {},
    words_list: [],
    user: null,
    data: {},
    loading: false,
}

export const usePageStore = defineStore('page', {
    state: () => {
        return defaultState
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async loadPage(path) {
            this.loading = true;
            try{
                const res = await page(path);
                this.auth = res.auth || defaultState.auth;
                this.title = res.title || defaultState.title;
                this.description = res.description || defaultState.description;
                this.footer = res.footer || defaultState.footer;
                this.proverb = res.proverb || defaultState.proverb;
                this.statistic = res.statistic || defaultState.statistic;
                this.words_list = res.words_list || defaultState.words_list;
                this.user = res.user || defaultState.user;
                this.data = res.data || defaultState.data;
                this.loading = res.loading || defaultState.loading;
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
    },
})
