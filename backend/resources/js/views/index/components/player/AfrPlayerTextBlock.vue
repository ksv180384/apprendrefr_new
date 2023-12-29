<script setup>
import { watchPostEffect, ref } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  text: { type: String, default: '' },
});

const arText = ref({});
//const arTimes = ref([]);

const textToArray = (text) => {
  const textRows =  text.split("\n").map(textRow => textRow.replace(/\[.*?\]/ig, ''));
  const timesRows = text.split("\n").map(textRow => textRow.match(/\[.*?\]/ig));

  const arrTextRows = {};

  if(!textRows || !timesRows){
    return arrTextRows;
  }

  // TODO Не работает
  timesRows.forEach((time, indexTime) => {
    if(time){
      if(time.length > 1){
        time.forEach((rowTime, index) => {
          const duration = timeToMillisecond(rowTime);
          arrTextRows[duration] = textRows[indexTime].replace('\r', '');
        });
      }else{
        const duration = timeToMillisecond(time[0]);
        arrTextRows[duration] = textRows[indexTime].replace('\r', '');
      }
    }
  });

  return arrTextRows;
}

watchPostEffect(() => {
  arText.value = textToArray(props.text);
  //arTimes.value = textToTimesArray(props.text);
  console.log(arText.value);
});

const timeToMillisecond = (time) => {
  const arTime = time.split(':');
  const sec = 60;
  let result = 0;

  arTime.forEach((item, index) => {
    item = item.replace(/\[|\]/ig, '');
    //console.log(item);
    if(index === 0){
      result += parseFloat(item);
    }else{
      result += index * sec * parseFloat(item);
    }
    // console.log(result);
    // console.log('-------');
  });
  console.log(result);
  return result;
}
</script>

<template>
  <div class="afr-player-text-block">
    <div class="text-container">
      <template v-if="arText">
        <div
          v-for="(rowText, time) in arText"
          :key="time"
          class="text-item"
        >
          {{ rowText || '&nbsp;' }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.afr-player-text-block{
  @apply h-full overflow-hidden rounded-md bg-sky-50 p-4 flex-grow shadow-[0_0_10px_-3px_rgba(0,0,0,0.6)];
}

.text-container{

}

.text-item{
  @apply text-nowrap text-center h-[28px] text-sm;
}
</style>
