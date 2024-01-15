<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  word: { type: String, default: '' },
});

const speakWord = () => {
  speak(props.word);
  checkSpeak();
};

const speak = (word) => {
  const speech = new SpeechSynthesisUtterance();

  speech.lang = 'fr-FR';
  speech.rate = .8;
  speech.pitch = 1;
  speech.volume = 1;
  speech.text = word;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
};

const checkSpeak = () => {
  const voices = window.speechSynthesis.getVoices();
  let lang = false;

  for(let key in voices){
    if(voices[key].lang === 'fr-FR'){
      lang = true;
    }
  }

  return lang;
};

// Запускаем пустую функцию проговаривания текста для подгрузки массива
// со списком поддерживаемых языков
speak('');

</script>

<template>
  <div class="afr-player-word" @click="speakWord">
    <Icon icon="mingcute:play-line" />
  </div>
</template>

<style scoped>
.afr-player-word{
  @apply flex justify-center items-center w-[24px] h-[24px] text-2xl cursor-pointer;
}
</style>
