<template>
  <transition name="fade" mode="out-in">
    <div v-if="currentlyPlaying.id" class="card">
      <div class="card-image">
        <figure class="image is-square">
          <img :src="album.image">
        </figure>
      </div>
      <progress
        :value="progress"
        class="progress is-primary is-small"
        max="100"
        style="height: 6px; border-radius: 0; margin: 0;"
        />
      <small class="is-pulled-left">{{ timeElapsed | digiClock }}</small>
      <small class="is-pulled-right">{{ parseInt(currentlyPlaying.duration, 10) | digiClock }}</small>
      <div style="padding-top: 12px; padding-bottom: 12px;">
        <div class="has-text-centered has-text-weight-bold">{{ currentlyPlaying.name }}</div>
        <div class="has-text-centered" style="margin-bottom: 6px;">{{ album.artist_name }}</div>
        <div class="level" style="margin: 0;">
          <div class="level-item has-text-centered">
            <a class="icon is-large" @click="playPrev">
              <i class="fas fa-2x fa-angle-double-left"></i>
            </a>
            <a v-show="paused" class="icon is-large" @click="resume">
              <i class="fas fa-3x fa-play-circle"></i>
            </a>
            <a v-show="!paused" class="icon is-large" @click="pause">
              <i class="fas fa-3x fa-pause-circle"></i>
            </a>
            <a class="icon is-large" @click="playNext">
              <i class="fas fa-2x fa-angle-double-right"></i>
            </a>
          </div>
        </div>
        <RealAudioPlayer
          :audio="currentlyPlaying.audio"
          :onEnded="playNext"
          :paused="paused"
          @paused="paused = true"
          @played="paused = false"
          @timeupdate="timeupdate"
          />
      </div>
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
        progress: 0,
        timeElapsed: 0,
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
    watch: {
      currentlyPlaying(track) {
        /* eslint-disable no-new */
        this.progress = 0;
        this.timeElapsed = 0;
        new Notification(track.name, {
          icon: this.album.image,
          body: this.album.artist_name,
          silent: true,
        });
      },
    },
    methods: {
      ...mapActions(['play', 'playPrev', 'playNext', 'playAll']),
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
      timeupdate(progress) {
        this.progress = progress;
        this.timeElapsed = this.timeElapsed + 1;
      },
    },
    filters: {
      digiClock(val) {
        const time = parseInt(val, 10);
        const minute = Math.floor(time / 60);
        const second = time % 60;
        return `${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
      },
    },
  };
</script>
