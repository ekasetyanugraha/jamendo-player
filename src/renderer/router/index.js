import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '/albums',
          name: 'albums',
          component: require('@/components/Albums').default,
        },
        {
          path: '/albums/{id}',
          name: 'album_tracks',
          component: require('@/components/AlbumTracks').default,
        },
      ],
    },
    {
      path: '*',
      redirect: '/albums',
    },
  ],
});
