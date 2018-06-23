import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '@/components/LandingPage';
import Albums from '@/components/Albums';
import AlbumDetails from '@/components/AlbumDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: LandingPage,
      children: [
        {
          path: 'albums',
          name: 'albums',
          component: Albums,
        },
        {
          path: 'albums/{id}',
          name: 'album_tracks',
          component: AlbumDetails,
        },
      ],
    },
    {
      path: '*',
      redirect: '/albums',
    },
  ],
});
