<script setup>
import dayjs from 'dayjs';

import AfrFooterStatistic from '@/components/footer/AfrFooterStatistic.vue';
</script>

<template>
  <footer class="afr-footer">

    <afr-footer-statistic/>

    <div class="afr-footer-content">
      <ul class="text-center">
        <li>© 2010 - {{ dayjs().format('YYYY') }} гг ApprendereFr.ru</li>
        <li>e-mail: admin@apprendrefr.ru</li>
        <li>
          <a class="link m-10" href="/info/terms-user">Правила пользовательского соглашения</a>
          <a class="link m-10" href="/info/privacy-policy">Политика по защите персональных данных</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.afr-footer{
  @apply bg-blue-50 mt-0.5 text-sm;
}

.afr-footer-content{

}

.afr-footer-content ul li{
  @apply py-1
}
</style>
