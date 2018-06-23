<template>
  <audio :src="audio" id="player" style="display: none"></audio>
</template>

<script>
  let audioElement = null;

  export default {
    name: 'RealAudioPlayer',
    props: {
      audio: {
        type: String,
        required: true,
      },
      paused: {
        type: Boolean,
        required: true,
      },
      onEnded: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        interval: null,
      };
    },
    watch: {
      paused(val) {
        if (val) audioElement.pause();
        else audioElement.play();
      },
    },
    mounted() {
      audioElement = document.getElementById('player');
      audioElement.autoplay = true;
      audioElement.addEventListener('ended', this.onEnded);
      audioElement.addEventListener('pause', () => {
        this.$emit('paused');
      });
      audioElement.addEventListener('play', () => {
        this.$emit('played');
      });
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const { currentTime, duration } = audioElement;
        const progress = (currentTime / duration) * 100;
        if (!isNaN(progress)) this.$emit('timeupdate', { progress, currentTime });
      }, 1000);
      audioElement.load();
    },
    destroyed() {
      clearInterval(this.interval);
    },
  };
</script>
