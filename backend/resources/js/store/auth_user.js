import { defineStore } from 'pinia';

const defaultUser = {
  is_auth: false,
  id: null,
  login: null,
  avatar: null,
  rang: null,
}

export const useAuthUserStore = defineStore('auth_user', {
  state: () => {
    return { ...defaultUser }
  },
  actions: {
    setUser(statistic) {
      this.is_auth = true;
      this.id = statistic.id;
      this.login = statistic.login;
      this.avatar = statistic.avatar;
      this.rang = statistic.rang;
    },
    reset(){
      Object.assign(this, defaultUser);
    }
  },
});
