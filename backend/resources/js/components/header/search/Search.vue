<script setup>
import { computed, ref } from 'vue';
import useClickOutside from '@/composables/useClickOutside.js';

import { Icon } from '@iconify/vue';

const props = defineProps({
  hints: { type: Array, default: [] }
});
const emits = defineEmits(['change', 'enter']);

const searchTypes = [
  { id: 'word', title: 'Слово' },
  { id: 'song', title: 'Песня' },
];
const refSearchTypesList = ref(null);
const refBtnTypesList = ref(null);
const searchText = ref('');
const isShowListBlock = ref(false);
const activeSearchType = ref(0);
const activeSearchTypeTitle = computed(() => searchTypes[activeSearchType.value].title);
let searchTimeout = null;

useClickOutside(
  refSearchTypesList,
  () => {
    isShowListBlock.value = false
  },
  refBtnTypesList
);

const textLang = computed(() => {
  const fr_pattern = /[a-zëôêûâîùçèàé]+/i;
  const ru_pattern = /[а-яё]+/i;
  const fr = fr_pattern.test(searchText.value);
  const ru = ru_pattern.test(searchText.value);
  if(searchText.value.length >= 1){
    if(fr && ru){
      return 'non';
    }else{
      if(fr){
        return 'Fr';
      }else{
        return 'Ru';
      }
    }
  }
  return null;
});

const changeSearchType = (e, index) => {
  activeSearchType.value = index;
  isShowListBlock.value = false;
}

const toggleListBlock = () => {
  isShowListBlock.value = !isShowListBlock.value;
}

const loadHintsSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emits('change', { text: searchText.value, type: searchTypes[activeSearchType.value].id });
  }, 500);
}

const submitSearch = () => {
  emits('enter', { text: searchText.value, type: searchTypes[activeSearchType.value].id });
}
</script>

<template>
  <div class="search">
    <div class="search-container">
      <div class="search-select-container">
        <div
          ref="refBtnTypesList"
          class="select-active"
          @click="toggleListBlock"
        >
          {{ activeSearchTypeTitle }}
        </div>
        <ul
          ref="refSearchTypesList"
          v-show="isShowListBlock"
        >
          <li
            v-for="(type, index) in  searchTypes"
            :key="type.id"
            @click="(e) => changeSearchType(e, index)"
          >
            {{ type.title }}
          </li>
        </ul>
      </div>

      <div class="input-block">
        <input
          v-model="searchText"
          type="text"
          placeholder="Поиск..."
          @keydown="loadHintsSearch"
          @keydown.enter="submitSearch"
        />
        <div class="lang">
          {{ textLang }}
        </div>
      </div>
      <div class="icon-block" @click="submitSearch">
        <Icon icon="tabler:search" width="23" height="23" />
      </div>
    </div>

    <ul
      v-show="hints.length"
      class="search-result-list"
    >
      <li v-for="hint in hints" :key="hint.id">
        {{ hint.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search{
  @apply relative;
  font-size: 14px;
}

.search-container{
  @apply flex flex-row items-center rounded overflow-hidden;
}

.search .select-active{
  @apply bg-blue-300 text-gray-50 w-20 py-1 text-center cursor-pointer;
}

.search-select-container .search ul{
  @apply absolute text-center w-20 bg-sky-50 rounded text-gray-500 shadow-md overflow-hidden;
}

.search-select-container .search ul li{
  @apply py-1 cursor-pointer transition duration-300 hover:bg-blue-300 hover:text-gray-50;
}

.input-block{
  @apply flex flex-row items-center;
}

.input-block input{
  @apply w-36 outline-none;
  padding: 5px 2rem 5px 6px;
}

.input-block .lang{
  @apply -ml-8 px-2 text-red-600;
  width: 30px;
}

.icon-block{
  @apply text-gray-50 bg-gray-600 px-3 py-1 cursor-pointer;
}

.search-result-list{
  @apply mt-0.5 absolute min-w-full bg-white rounded text-gray-500 shadow-md overflow-hidden;
}

.search-result-list li{
  @apply py-1.5 px-3 whitespace-nowrap cursor-pointer transition duration-300 hover:bg-sky-100;
}
/*
.search{
    display: flex;
    flex-direction: row;
    color: #373737;
    border-radius: 2px;
    background-color: #f4f8fa;
    font-size: 14px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
}
.search>.label{
    flex: 1 0 60px;
    text-align: center;
    line-height: 28px;
}
.search>.select{
    flex: 1 0 60px;
    text-align: center;
    position: relative;
}

.search>.select>span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 14px;
    background-color: #8db3ce;
    cursor: pointer;
    transition: all 0.3s ease 0s;
}

.search>.select>span:hover{
    background-color: #70cc74;
}

.search>.select>ul{
    color: #fff;
    padding: 0;
    margin: 0;
    display: none;
    position: absolute;
    text-align: center;
    background-color: #a5d1f1;
    width: 60px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border-radius: 0 0 2px 2px;
    left: 0;
    z-index: 0;
}

.search>.select>ul.show{
    display: initial;
}

.search>.select>ul>li{
    list-style: none;
    cursor: pointer;
    padding: 6px 0;
    transition: all 0.3s ease 0s;
}

.search>.select>ul>li:hover{
    background-color: #70cc74;
    color: #fff;
}

.search>.input-search{
    position: relative;
    flex: 100%;
}

.search-lang{
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 28px;
    justify-content: center;
    align-items: center;
    color: red;
    background-color: #f4f8fa;
    display: none;
}

.show-lang.search-lang{
    display: flex;
}

.search-lang>span{
    display: none;
}

.show-ru .search-lang-ru{
    display: initial;
}

.show-fr .search-lang-fr{
    display: initial;
}

.show-non .search-lang-non{
    display: initial;
}

.search>.input-search>input{
    width: 100%;
    padding: 6px 8px;
    font-size: 14px;
    border: none;
    outline: none;
}

.search>.btn-block{
    flex: 1 0 30px;

}

.search>.btn-block>button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #ececec;
    background-color: #4F5257;
    border: 0;
    font-size: 16px;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
}

.search>.btn-block>button:hover{
    color: #fff;
    background-color: #000;
}

.search-result-list{
    position: absolute;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border-radius: 0 0 4px 4px;
    display: none;
}

.search-result-list.show-search-result{
    display: block;
}

.search-result-list>ul{
    max-height: calc(100vh - 100px);
    overflow: auto;
}

.search-result-list>ul>li{
    padding: 8px 6px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.3s ease 0s;
}

.search-result-list>ul>li>span.search-artist-name{
    font-weight: bold;
    display: block;
}

.search-result-list>ul>li:hover{
    color: #176093;
    background-color: #e6f0f6;
}

@media (max-width: 870px) {
    .search{
        margin-left: 6px;
    }
}
*/
</style>
