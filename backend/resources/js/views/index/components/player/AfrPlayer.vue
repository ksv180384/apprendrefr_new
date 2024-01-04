<script setup>
import {reactive, ref} from 'vue';
import api from '@/services/api';
import { Icon } from '@iconify/vue';
import parse from 'id3-parser';
import { convertFileToBuffer } from 'id3-parser/lib/util';
import dayjs from 'dayjs';

import AfrVolume from '@/views/index/components/player/AfrVolume.vue';
import AfrProgressBar from '@/views/index/components/player/AfrProgressBar.vue';
import AfrPlayerText from '@/views/index/components/player/AfrPlayerText.vue';

const isPlay = ref(false);
const audio = ref(null);
const fileName = ref(null);
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
const isLoadingSongText = ref(false);
const textPosition = ref('50%');
const songText = reactive({
  fr: '',
  ru: '',
  transcription: '',
});

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
    // Устанавливаем позицию прогресс бара
    currentTime.value = audio.value.currentTime; // Текущее время проигрывания трека
    currentTimeHuman.value = dayjs(currentTime.value * 1000).format('mm:ss');
    progressLineValue.value = currentTime.value / (duration.value / 100);

    // Устанавливаем позицию текста песни
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

    artist.value = tags.artist;
    track.value = tags.title;
    album.value = tags.album;
    fileName.value = file.name

    duration.value = audio.value.duration;
    durationHuman.value = dayjs(duration.value * 1000).format('mm:ss');

    const imageData = new Uint8Array(tags.image.data);
    imageLink.value = URL.createObjectURL(
      new Blob([imageData.buffer], { type: tags.image.mime } /* (1) */)
    );
    progressLineValue.value = 0;

    // Поиск текста песни
    searchSongText();
  }
};

const changeVolume = (data) => {
  if(!audio.value){
    return true;
  }
  volume.value = (data / 100).toFixed(2);
  audio.value.volume = volume.value;
}

const changePositionProgressBar = (position) => {
  audio.value.currentTime = position;
}

const searchSongText = async () => {

  isLoadingSongText.value = true;
  try {
    const res = await api.songText.searchByArtistTitle({ artist: artist.value, title: track.value, file_name: fileName.value });
    songText.fr = res.text_fr;
    songText.ru = res.text_ru;
    songText.transcription = res.text_transcription;
  } catch (e) {
    console.error(e);
  } finally {
    isLoadingSongText.value = false;
  }
}
</script>

<template>
  <div class="afr-player">

    <div>
      Player
      <input type="file" @change="uploadFile"/>
    </div>

    <div class="afr-player-bar">

      <AfrPlayerText
        :fr="songText.fr"
        :ru="songText.ru"
        :transcription="songText.transcription"
        :current-time="currentTime"
      />

      <AfrProgressBar
        :progress-line-value="progressLineValue"
        :duration="duration"
        @changePosition="changePositionProgressBar"
      />

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
  @apply fixed bottom-0 max-w-[1440px] w-full mx-auto z-10 rounded-t -ms-2;
}

.afr-player-controls{
  @apply flex flex-row justify-center items-center px-4 text-[32px] bg-blue-50;
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
