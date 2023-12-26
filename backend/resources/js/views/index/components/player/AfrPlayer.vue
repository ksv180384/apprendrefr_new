<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import parse from 'id3-parser';
import { convertFileToBuffer } from 'id3-parser/lib/util';
import dayjs from 'dayjs';

import AfrVolume from '@/views/index/components/player/AfrVolume.vue';

const isPlay = ref(false);
const audio = ref(null);
const artist = ref(null);
const track = ref(null);
const album = ref(null);
const imageLink = ref(null);
const timeInterval = ref(null);
const duration = ref(0);
const volume = ref(0.5);
const durationHuman = ref(0);
const currentTime = ref(0);
const currentTimeHuman = ref(0);
const progressLineValue = ref(0);
const durationProgressBarPos = ref(0);
const cursorPositionProgressBar = ref(0);
const durationProgressBarPosHuman = ref(0);

const play = () => {
  isPlay.value = true;
  audio.value.play();
  timeInterval.value = setInterval(checkPlayerTime, 30);
}

const pause = () => {
  isPlay.value = false;
  audio.value.pause();
  clearTimeout(timeInterval.value);
}

const stop = () => {
  isPlay.value = false;
  currentTime.value = 0;
  clearTimeout(timeInterval.value);
  if(audio.value){
    audio.value.pause();
  }
}

const uploadFile = (e) => {

  if(typeof e.target.files[0] === 'undefined'){
    return true;
  }
  const file_type =  e.target.files[0].type;
  if (file_type.indexOf('audio') !== -1){
    audioFileInit(e.target.files[0]);
  }
};

const checkPlayerTime = () => {
  if(audio.value){
    currentTime.value = audio.value.currentTime; // Текущее время проигрывания трека
    currentTimeHuman.value = dayjs(currentTime.value * 1000).format('mm:ss');
    progressLineValue.value = currentTime.value / (duration.value / 100);
    // console.log('currentTime: ', currentTime.value);
    // console.log('duration: ', duration.value);
    // console.log('progressLineValue: ', progressLineValue.value);
  }
}

const audioFileInit = async (file) => {
  stop();
  const sound = URL.createObjectURL(file);
  audio.value = new Audio(sound);
  audio.value.onloadedmetadata = async () => {
    audio.value.volume = volume.value;

    const fileDat = await convertFileToBuffer(file);
    const tags = parse(fileDat);

    artist.value = tags.title;
    track.value = tags.artist;
    album.value = tags.album;

    duration.value = audio.value.duration;
    durationHuman.value = dayjs(duration.value * 1000).format('mm:ss');

    const imageData = new Uint8Array(tags.image.data);
    imageLink.value = URL.createObjectURL(
      new Blob([imageData.buffer], { type: tags.image.mime } /* (1) */)
    );
    progressLineValue.value = 0;
  }
};

const changeVolume = (data) => {
  if(!audio.value){
    return true;
  }
  volume.value = (data / 100).toFixed(2);
  audio.value.volume = volume.value;
}

const clickProgressBar = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  audio.value.currentTime = durationProgressBarPos.value;
  progressLineValue.value = cursorPositionProgressBar.value;
}

const mousemoveProgressBar = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const cursorPosition = e.clientX - rect.left;
  const durationTick = duration.value / rect.width;
  durationProgressBarPos.value = durationTick * cursorPosition;
  cursorPositionProgressBar.value = cursorPosition / (rect.width / 100);
  durationProgressBarPosHuman.value = dayjs(durationProgressBarPos.value * 1000).format('mm:ss');
}
</script>

<template>
  <div class="afr-player">

    <div>
      Player
      <input type="file" @change="uploadFile"/>
    </div>

    <div class="afr-player-bar">
      <div
        class="afr-progress-bar"
        @click="clickProgressBar"
        @mousemove="mousemoveProgressBar"
      >
        <div
          class="afr-progress-bar-cursor-position"
          :style="`left: ${cursorPositionProgressBar}%`"
        >
          {{ durationProgressBarPosHuman }}
        </div>
        <div
          class="afr-progress-line"
          :style="`width: ${progressLineValue}%`"
        ></div>
      </div>

      <div class="afr-player-controls">

        <div v-if="!isPlay" class="afr-player-btn" @click="play">
          <Icon icon="mingcute:play-line" />
        </div>
        <div v-else class="afr-player-btn" @click="pause">
          <Icon icon="mingcute:pause-fill" />
        </div>
        <div class="afr-track-info">
          <div class="afr-track-tags">
            <div class="afr-artist">
              {{ artist }}
            </div>
            <div class="afr-track">
              {{ track }}
            </div>
          </div>
          <div v-if="imageLink" class="afr-track-image">
            <img :src="imageLink" :alt="album" :title="album"/>
          </div>
        </div>
        <AfrVolume :volume="volume * 100" @change="changeVolume"/>
        <div class="afr-track-time">
          {{currentTimeHuman}} / {{ durationHuman }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.afr-player-bar{
  @apply fixed bottom-0 max-w-[1440px] w-full bg-blue-50 mx-auto z-10 rounded-t -ms-2;
}

.afr-progress-bar{
  @apply w-full h-4 bg-blue-100 rounded-t;
}

.afr-progress-line{
  @apply h-full bg-blue-300 rounded-tl rounded-tr;
}

.afr-player-controls{
  @apply flex flex-row justify-center items-center px-4 text-[32px];
}

.afr-player-btn{
  @apply p-4 cursor-pointer hover:bg-blue-100;
}

.afr-track-info{
  @apply flex items-center ms-2.5 flex-grow;
}

.afr-track-tags{

}

.afr-track-image{
  @apply ms-2;
}

.afr-track-image img{
  @apply w-[60px] h-[60px] object-contain;
}

.afr-artist{
  @apply text-sm;
}

.afr-track{
  @apply text-sm font-bold;
}

.afr-track-time{
  @apply text-xs;
}

.afr-progress-bar-cursor-position{
  @apply absolute bg-white text-xs justify-center w-[60px] -ms-[30px] py-1 rounded-xl -mt-7 hidden;
}

.afr-progress-bar:hover .afr-progress-bar-cursor-position{
  @apply flex;
}
</style>
