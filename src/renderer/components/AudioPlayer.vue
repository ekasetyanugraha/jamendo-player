<template>
  <transition name="fade" mode="out-in">
    <div v-if="currentlyPlaying.id" class="card">
      <div class="card-image">
        <figure class="image is-square">
          <img :src="album.image">
        </figure>
      </div>
      <div class="has-text-centered has-text-weight-bold">{{ currentlyPlaying.name }}</div>
      <div class="has-text-centered">{{ album.artist_name }}</div>
      <div v-if="!paused" class="level">
        <div class="level-item has-text-centered">
          <a class="icon is-large" @click="pause">
            <i class="fas fa-2x fa-backward"></i>
          </a>
          <a class="icon is-large" @click="resume">
            <i class="fas fa-3x fa-play-circle"></i>
          </a>
          <a class="icon is-large" @click="playNext">
            <i class="fas fa-2x fa-forward"></i>
          </a>
        </div>
      </div>
      <div v-else class="level">
        <div class="level-item has-text-centered">
          <a class="icon is-large" @click="pause">
            <i class="fas fa-2x fa-backward"></i>
          </a>
          <a class="icon is-large" @click="pause">
            <i class="fas fa-3x fa-pause-circle"></i>
          </a>
          <a class="icon is-large" @click="playNext">
            <i class="fas fa-2x fa-forward"></i>
          </a>
        </div>
      </div>
      <RealAudioPlayer
        :audio="currentlyPlaying.audio"
        :onEnded="playNext"
        :paused="paused"
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
    data() {
      return {
        paused: false,
      };
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
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    },
  };
</script>
