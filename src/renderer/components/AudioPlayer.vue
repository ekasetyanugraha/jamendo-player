<template>
  <audio :src="currentlyPlaying" ref="player" controls></audio>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'AudioPlayer',
    data() {
      return {
        currentlyPlaying: null,
      };
    },
    computed: {
      ...mapState({
        queue: state => state.Playlist.queue,
      }),
    },
    watch: {
      queue() {
        this.currentlyPlaying = this.queue[0];
        this.$refs.player.load();
      },
    },
    mounted() {
      this.$refs.player.autoplay = true;
    },
  };
</script>
