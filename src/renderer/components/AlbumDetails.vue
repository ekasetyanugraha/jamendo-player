<template>
  <transition name="fade" mode="out-in">
    <div v-if="album">
      <section class="hero is-danger">
        <a style="margin-left: 24px; margin-top: 24px;" @click.prevent="$router.go(-1)">
          <span class="icon">
            <i class="fas fa-chevron-left"></i>
          </span>
          <span>Back</span>
        </a>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-one-fifth">
                <figure class="image is-square">
                  <img :src="album.image">
                </figure>
              </div>
              <div class="column">
                <h1 class="title">
                  {{ album.name }} ({{ album.releasedate | year }})
                </h1>
                <h2 class="subtitle">
                  {{ album.artist_name }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <table v-if="tracks.length" class="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th style="width: 24px">No</th>
            <th>Title</th>
            <th>Duration</th>
            <th>
              <a class="button is-danger is-outlined" @click.prevent="playAll(tracks)">
                <span>Play All</span>
                <span class="icon" style="margin-left: 6px;">
                  <i class="fas fa-play"></i>
                </span>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="track in tracks" :key="track.id" :class="{'has-background-danger has-text-white': track.id === currentlyPlaying.id}">
            <td>{{ track.position }}</td>
            <td class="ellipsis">{{ track.name }}</td>
            <td>{{ track.duration | digiClock }}</td>
            <td>
              <a :class="{'has-text-white': track.id === currentlyPlaying.id, 'has-text-danger': track.id !== currentlyPlaying.id}" class="icon" @click.prevent="play(track)">
                <i class="fas fa-lg fa-play-circle"></i>
              </a>
              <a :class="{'has-text-white': track.id === currentlyPlaying.id, 'has-text-danger': track.id !== currentlyPlaying.id}" class="icon" @click.prevent="addToQueue(track)">
                <i class="fas fa-lg fa-plus-circle"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="has-text-centered">
      <span class="icon is-large">
        <i class="fas fa-3x fa-spinner fa-pulse"></i>
      </span>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'AlbumDetails',
    computed: {
      albumId() {
        return this.$route.params.id;
      },
      ...mapState({
        albumDetails: state => state.Album.albumDetails,
        currentlyPlaying: state => state.Playlist.currentlyPlaying,
      }),
      album() {
        return this.albumDetails.find(album => album.id === this.albumId);
      },
      tracks() {
        if (!this.album) return [];
        return this.album.tracks;
      },
    },
    methods: {
      ...mapActions(['getTracksByAlbum', 'play', 'playAll', 'addToQueue']),
    },
    filters: {
      year(val) {
        return new Date(val).getFullYear();
      },
      digiClock(val) {
        const time = parseInt(val, 10);
        const minute = Math.floor(time / 60);
        const second = time % 60;
        return `${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
      },
    },
    mounted() {
      if (!this.albumId) {
        this.$router.push({
          name: 'albums',
        });
      } else {
        this.getTracksByAlbum(this.albumId);
      }
    },
  };
</script>
