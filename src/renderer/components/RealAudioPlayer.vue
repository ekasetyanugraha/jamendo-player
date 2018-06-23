<template>
  <audio :src="audio" id="player" controls></audio>
</template>

<script>
  export default {
    name: 'RealAudioPlayer',
    props: {
      audio: {
        type: String,
        required: true,
      },
      onEnded: {
        type: Function,
        default: () => {},
      },
    },
    mounted() {
      const audioElement = document.getElementById('player');
      audioElement.autoplay = true;
      audioElement.addEventListener('ended', this.onEnded);
      audioElement.load();
    },
  };
</script>
