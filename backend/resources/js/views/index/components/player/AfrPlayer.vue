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
const durationHuman = ref(0);
const currentTime = ref(0);
const currentTimeHuman = ref(0);

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
  audio.value.pause();
  currentTime.value = 0;
  clearTimeout(timeInterval.value);
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
    console.log(currentTime.value);
  }
}

const audioFileInit = async (file) => {
  const sound = URL.createObjectURL(file);
  audio.value = new Audio(sound);

  const fileDat = await convertFileToBuffer(file);
  const tags = parse(fileDat);

  artist.value = tags.title;
  track.value = tags.artist;
  album.value = tags.album;

  duration.value = audio.value.duration;
  durationHuman.value = dayjs(audio.value.duration * 1000).format('mm:ss');

  const imageData = new Uint8Array(tags.image.data);
  imageLink.value = URL.createObjectURL(
    new Blob([imageData.buffer], { type: tags.image.mime } /* (1) */)
  );
};
</script>

<template>
  <div class="afr-player">

    <div>
      Player
      <input type="file" @change="uploadFile"/>
    </div>

    <div class="afr-player-bar">
      <div class="afr-progress-bar">
        <div class="afr-progress-line"></div>
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
        <AfrVolume/>
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
  @apply h-full bg-blue-300;
  width: 20%;
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
</style>
