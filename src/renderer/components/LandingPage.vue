<template>
  <div class="columns">
    <div class="column is-one-fifth" style="position: fixed; z-index: 1000; width: 200px;">
      <aside class="menu box">
        <p class="menu-label">Jamendo</p>
        <ul class="menu-list">
          <li>
            <router-link to="albums">Albums</router-link>
          </li>
        </ul>
      </aside>
      <AudioPlayer />
    </div>
    <div class="column" style="margin-left: 200px;">
      <transition name="fade" mode="out-in">
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

<style>
  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
