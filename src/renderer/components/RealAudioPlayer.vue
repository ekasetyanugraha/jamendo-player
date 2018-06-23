<template>
  <audio :src="audio" id="player" controls style="display: none"></audio>
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
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        if (!isNaN(progress)) this.$emit('timeupdate', progress);
      }, 1000);
      audioElement.load();
    },
    destroyed() {
      clearInterval(this.interval);
    },
  };
</script>
