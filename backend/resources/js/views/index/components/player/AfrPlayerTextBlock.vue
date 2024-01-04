<script setup>
import { watchPostEffect, ref, watch } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  currentTime: { type: Number, default: 0 },
});

const arText = ref({});
const hRow = ref(28);
const textPositionStart = ref('0px');
const textPosition = ref('50%');
const textPositionsList = ref([]);
const refTextContainer = ref(null);
//const arTimes = ref([]);

// Из строки, формируем массив [{ text: String, duration: Number}, ...], сортируя его по полю duration
const textToArray = (text) => {
  const textRows =  text.split("\n").map(textRow => textRow.replace(/\[.*?\]/ig, ''));
  const timesRows = text.split("\n").map(textRow => textRow.match(/\[.*?\]/ig));

  const arrTextRows = [];

  if(!textRows || !timesRows){
    return arrTextRows;
  }

  let newIndex = 0;
  timesRows.forEach((time, indexTime) => {
    if(time){
      if(time.length > 1){
        time.forEach((rowTime, index) => {
          const duration = timeToSecond(rowTime);
          arrTextRows[newIndex] = {
            text: textRows[indexTime].replace('\r', ''),
            duration: duration
          };
          newIndex++;
        });
      }else{
        const duration = timeToSecond(time[0]);
        arrTextRows[newIndex] = {
          text: textRows[indexTime].replace('\r', ''),
          duration: duration
        };
        newIndex++;
      }
    }
  });

  return arrTextRows.sort((a, b) => {
    if (a.duration < b.duration){
      return -1;
    }
    if (a.duration > b.duration){
      return 1;
    }
    return 0;
  });
}

const getTextPositions = (arText) => {
  //console.log(arText);
  const result = [];
  arText.forEach((item, index) => {
    const next = index + 1;
    if(arText[next]){
      // Получаем продолжительность времени, которое текущая строка отображается (продолжительность прокрутки строки)
      const durationRow = arText[next].duration - arText[index].duration;
      // Получаем время за которое происходит смещение на один пиксель
      const tickOnePixel = durationRow / hRow.value;
      //result.push(arText[index].duration + ' ----');
      for (let i = 0; hRow.value > i; i++){
        result.push(arText[index].duration + ((i + 1) * tickOnePixel));
      }
    }
    //console.log(index, item);
  });
  return result;
}

// Отслеживаем загрузку текста
watch(
  () => props.text,
  () => {
    arText.value = textToArray(props.text);
    textPositionsList.value = getTextPositions(arText.value);
    //textPosition.value = `${refTextContainer.value.getBoundingClientRect().top}px`;
    textPositionStart.value = parseInt(window.getComputedStyle(refTextContainer.value).top);
    textPosition.value = `${textPositionStart.value}px`;
    //console.log(window.getComputedStyle(refTextContainer.value).top);
    console.log(textPositionsList.value);
    console.log(textPosition.value);
});

watch(
  () => props.currentTime,
  () => {
    let currentPixel = 0;
    let nextPixel = 1;
    textPositionsList.value.forEach((pixelTime, pixelIndex) => {
      //const pixels = pixelIndex + 1;
      currentPixel = pixelIndex;
      console.log(currentPixel, nextPixel)
      if(currentPixel === nextPixel && pixelTime <= props.currentTime){
        textPosition.value = `${textPositionStart.value - currentPixel}px`;
        nextPixel = currentPixel + 1;
        console.log(textPosition.value);
        console.log(pixelTime);
      }
    });

    console.log(props.currentTime);
    // textPosition.value += '';
  }
);

// Время в секунды
const timeToSecond = (time) => {
  const arTime = time.split(':');
  const secInMin = 60;
  let result = 0;

  arTime.forEach((item, index) => {
    item = item.replace(/\[|\]/ig, '');
    if(index === (arTime.length - 1)){
      result += parseFloat(item);
    }else{
      result += (index + 1) * secInMin * parseFloat(item);
    }
  });
  return result;
}
</script>

<template>
  <div class="afr-player-text-block">
    <div ref="refTextContainer" class="text-container" :style="`top: ${textPosition}`">
      <template v-if="arText">
        <div
          v-for="(rowText, time) in arText"
          :key="time"
          class="text-item"
          :style="`height: ${hRow}px`"
        >
          {{ rowText.text || '&nbsp;' }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.afr-player-text-block{
  @apply h-full overflow-hidden rounded-md bg-sky-50 p-4 flex-grow shadow-[0_0_10px_-3px_rgba(0,0,0,0.6)] relative;
}

.afr-player-text-block:before{
  @apply absolute w-full h-0.5 bg-black left-0 top-1/2 opacity-5;
  content: '';
  transform: translateY(-50%);
}

.text-container{
  @apply absolute w-full left-0 z-[1];
}

.text-item{
  @apply text-nowrap flex justify-center items-center text-sm;
}
</style>
