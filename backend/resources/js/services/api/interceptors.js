import { useStatisticStore } from '@/store/statistic.js';
import { useAuthUserStore } from '@/store/auth_user.js';
import { useProverbStore } from '@/store/proverb.js';
import { useWordsStore } from '@/store/words.js';

export const interceptors = (api) => {
  api.interceptors.request.use(
    function (config) {

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Обработка ответа сервера для всех заросов
  api.interceptors.response.use(
    async function (response) { // При положительном ответе сервера

      const responseData = response.data;

      // Добавляем токен пользователя (user/guest), чтоб определять сколько человек на сайте
      localStorage.setItem('user-token-page', responseData.app_user_token);

      if(responseData.statistic){
        const statisticStore = useStatisticStore();
        statisticStore.setStatistic(responseData.statistic);
      }
      if(responseData.words_list){
        const wordsStore = useWordsStore();
        wordsStore.setWords(responseData.words_list);
      }
      if(responseData.proverb){
        const proverbStore = useProverbStore();
        proverbStore.setProverb(responseData.proverb);
      }

      const authUserStore = useAuthUserStore();
      if(responseData.user){
        authUserStore.setUser(responseData.user);
      } else {
        authUserStore.reset();
      }

      return responseData;
    },
    async function (error) { // При ответе сервера с ошибкой

      return Promise.reject(error);
    }
  );
};
