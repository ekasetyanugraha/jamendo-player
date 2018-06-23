<template>
  <transition name="fade" mode="out-in">
    <div v-if="currentlyPlaying.id" class="card">
      <div class="card-image">
        <figure class="image is-square">
          <img :src="album.image">
        </figure>
      </div>
      <RealAudioPlayer
        :audio="currentlyPlaying.audio"
        :onEnded="playNext"
        />
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import RealAudioPlayer from './RealAudioPlayer';

  export default {
    name: 'AudioPlayer',
    components: {
      RealAudioPlayer,
    },
    computed: {
      ...mapState({
        queue: state => state.Playlist.queue,
        currentlyPlaying: state => state.Playlist.currentlyPlaying,
        albums: state => state.Album.albumDetails,
      }),
      album() {
        if (!this.currentlyPlaying) return {};
        const cpId = this.currentlyPlaying.id;
        return this.albums.find(album => album.tracks.filter(track => track.id === cpId).length > 0);
      },
    },
    methods: {
      ...mapActions(['play', 'playNext', 'playAll']),
    },
  };
</script>
