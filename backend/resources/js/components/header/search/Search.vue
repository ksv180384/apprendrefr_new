<script setup>
import { computed, ref } from 'vue';
import useClickOutside from '@/composables/useClickOutside.js';
import { vOnClickOutside } from '@vueuse/components';
import api from '@/services/api/index.js';

import { Icon } from '@iconify/vue';
import WordItem from '@/components/header/search/WordItem.vue';
import SongItem from '@/components/header/search/SongItem.vue';

const searchTypes = [
  { id: 'word', title: 'Слово' },
  { id: 'song', title: 'Песня' },
];
const refSearchTypesList = ref(null);
const refBtnTypesList = ref(null);
const searchText = ref('');
const hints = ref([]);
const isShowListBlock = ref(false);
const activeSearchType = ref(0);
const isShow = ref(false);
const isSearchLoading = ref(false);
const isShowDropdown = computed(() => isShow.value && searchText.value.length >= 2/* && props.hints.length*/);
const activeSearchTypeTitle = computed(() => searchTypes[activeSearchType.value].title);
const activeSearchTypeId = computed(() => searchTypes[activeSearchType.value].id);

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

const changeSearchType = (index) => {
  activeSearchType.value = index;
  isShowListBlock.value = false;
  loadHintsSearch();
}

const toggleListBlock = () => {
  isShowListBlock.value = !isShowListBlock.value;
}

const clickOutSide = (e) => {
  if(e.target.id === 'inputSearch'){
    return;
  }
  isShow.value = false;
}

const focusInputSearch = () => {
  isShow.value = true;
}

const loadHintsSearch = () => {
  isSearchLoading.value = true;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    isShow.value = true;
    loadSearchHints({ text: searchText.value, type: activeSearchTypeId.value, lang: textLang.value });
  }, 500);
}

const submitSearch = () => {
  // emits('enter', { text: searchText.value, type: activeSearchTypeId.value });
}

const loadSearchHints = async (search) => {
  if(search.text.length < 2){
    hints.value = [];
    isSearchLoading.value = false;
    return;
  }
  try{
    const res = await api.search({ text: search.text, type: search.type, lang: search.lang });
    hints.value = res.search.map(item => {
      return item
    });
  } catch (e) {
    console.error(e);
  } finally {
    isSearchLoading.value = false;
  }
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
            v-for="(type, index) in searchTypes"
            :key="type.id"
            @click="changeSearchType(index)"
          >
            {{ type.title }}
          </li>
        </ul>
      </div>

      <div class="input-block">
        <input
          v-model="searchText"
          id="inputSearch"
          type="text"
          placeholder="Поиск..."
          autocomplete="off"
          @keydown="loadHintsSearch"
          @keydown.enter="submitSearch"
          @focus.stop="focusInputSearch"
        />
        <div class="lang">
          {{ textLang }}
        </div>
      </div>
      <div class="icon-block" @click="submitSearch">
        <template v-if="isSearchLoading">
          <Icon icon="svg-spinners:6-dots-rotate" width="23" height="23" />
        </template>
        <template v-else>
          <Icon icon="tabler:search" width="23" height="23"/>
        </template>
      </div>
    </div>

    <ul
      v-show="isShowDropdown"
      class="search-result-list"
      v-on-click-outside="clickOutSide"
    >
      <template v-if="!hints.length && !isSearchLoading">
        <li class="text-center">
          Ничего не найдено
        </li>
      </template>
      <template v-else-if="activeSearchTypeId === 'word'">
        <WordItem
          v-for="word in hints"
          :key="word.id"
          :word="word"
        />
      </template>
      <template v-else>
        <SongItem
          v-for="song in hints"
          :key="song.id"
          :song="song"
        />
      </template>
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

.search-select-container ul{
  @apply absolute text-center w-20 bg-sky-50 rounded text-gray-500 shadow-md overflow-hidden;
}

.search-select-container ul li{
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
