import { defineStore } from 'pinia';

const defaultWords = {
  words: [],
}

export const useWordsStore = defineStore('words', {
  state: () => {
    return { ...defaultWords }
  },
  actions: {
    setWords(words) {
      this.words = words;
    },
  },
});
