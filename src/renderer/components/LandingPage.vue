<template>
  <div class="columns">
    <div class="column is-one-fifth">
      <aside class="menu box">
        <p class="menu-label">
          Jamendo
        </p>
        <ul class="menu-list">
          <li>
            <router-link to="albums">Albums</router-link>
          </li>
        </ul>
      </aside>
      <div>
        <AudioPlayer />
      </div>
    </div>
    <div class="column">
      <transition name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  import AudioPlayer from './AudioPlayer';

  export default {
    name: 'LandingPage',
    components: {
      AudioPlayer,
    },
  };
</script>
