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
      audioElement.load();
    },
  };
</script>
