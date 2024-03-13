import {
  createRouter,
  createWebHistory
} from 'vue-router';
import { usePageStore } from '@/store/page.js';

import LayoutTwo from '@/layouts/LayoutTwo.vue';
// import ParserLayout from '@/views/layouts/ParserLayout.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index/Index.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
  {
    path: '/grammar',
    name: 'grammar',
    component: () => import('@/views/grammar/Grammar.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
  {
    path: '/lyrics',
    name: 'lyrics',
    component: () => import('@/views/lyrics/Lyrics.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
  {
    path: '/lessons',
    name: 'lessons',
    component: () => import('@/views/lessons/Lessons.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import('@/views/forum/Forum.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
  {
    path: '/dictionary',
    name: 'dictionary',
    component: () => import('@/views/dictionary/Dictionary.vue'),
    meta: {
      title: 'index',
      layout: LayoutTwo,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

router.beforeEach(async (to, from, next) => {

  // const pageStore = usePageStore();
  // await pageStore.loadDataPage(to.path, to.query);
  // // current page view title
  // document.title = `${to.meta?.title}`;
  const page = usePageStore();
  await page.loadPage(to.path);
  next();

  // Подстановка layout поумолчанию
  // const layout = to ? to?.meta?.layout : null;
  // to.meta.layout = setDefaultLayout(layout);
});

const setDefaultLayout = (layout) => {
  // if(!layout){
  //     return DefaultLayout;
  // }

  return layout;
}

export default router;
