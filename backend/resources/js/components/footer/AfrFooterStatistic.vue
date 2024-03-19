<script setup>
import { computed } from 'vue';
import { useStatisticStore } from '@/store/statistic.js';

const statisticStore = useStatisticStore();
const statistic = computed(() => statisticStore);
</script>

<template>
  <div class="afr-footer-statistic container-max">

    <div class="afr-footer-statistic-users-list">
      <ul>
        <li v-for="user in statistic.online_users">
          <router-link to="#">{{ user.user.login }}</router-link>
        </li>
      </ul>
    </div>

    <div class="afr-footer-statistic-online">
      <ul>
        <li>Посетители <span>{{ statistic.count_users }}</span></li>
        <li>Гостей <span>{{ statistic.count_guests }}</span></li>
        <li>Всего <span>{{ statistic.count_all }}</span></li>
        <li>Зарегистрировано <span>{{ statistic.count_users_register }}</span>
        </li><li>Всего сообщений <span >{{ statistic.count_messages }}</span></li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
.afr-footer-statistic{
  @apply flex flex-row text-xs mx-auto py-2 gap-2;
}

.afr-footer-statistic-users-list{
  @apply flex-1 p-2 bg-blue-100 rounded;
}

.afr-footer-statistic-users-list ul{
  @apply flex flex-row gap-2;
}

.afr-footer-statistic-online{
  @apply p-2 bg-blue-100 rounded;
}
</style>
