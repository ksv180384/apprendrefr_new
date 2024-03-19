import { defineStore } from 'pinia';

const defaultProverb = {
  id: null,
  text: '',
  translation: '',
}

export const useProverbStore = defineStore('proverb', {
  state: () => {
    return { ...defaultProverb }
  },
  actions: {
    setProverb(proverb) {
      this.id = proverb.id;
      this.text = proverb.text;
      this.translation = proverb.translation;
    },
  },
});
