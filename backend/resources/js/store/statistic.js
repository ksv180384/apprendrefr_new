import { defineStore } from 'pinia';

const defaultStatistic = {
  count_all: 0,
  count_guests: 0,
  count_messages: 0,
  count_users: 0,
  count_users_register: 0,
  online_users: [],
}

export const useStatisticStore = defineStore('statistic', {
  state: () => {
    return defaultStatistic
  },
  actions: {
    setStatistic(statistic) {
      this.count_all = statistic.count_all;
      this.count_guests = statistic.count_guests;
      this.count_messages = statistic.count_messages;
      this.count_users = statistic.count_users;
      this.count_users_register = statistic.count_users_register;
      this.online_users = statistic.online_users;
    },
  },
});
