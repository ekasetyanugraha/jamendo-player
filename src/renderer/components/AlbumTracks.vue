<template>
  <transition name="fade" mode="out-in">
    <div v-if="album">
      <section class="hero is-primary">
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
                  {{ album.name }}
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
            <th>
              <a class="button is-link" @click.prevent="playAll(tracks)">
                <span>Play All</span>
                <span class="icon" style="margin-left: 6px;">
                  <i class="fas fa-play"></i>
                </span>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="track in tracks" :key="track.id" :class="{'is-selected': track.id === currentlyPlaying.id}">
            <td>{{ track.position }}</td>
            <td>{{ track.name }}</td>
            <td>
              <a class="icon" @click.prevent="play(track)">
                <i class="fas fa-lg fa-play-circle"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'AlbumTracks',
    computed: {
      albumId() {
        return this.$route.params.id;
      },
      ...mapState({
        albums: state => state.Album.albumDetails,
        currentlyPlaying: state => state.Playlist.currentlyPlaying,
      }),
      album() {
        return this.albums.find(album => album.id === this.albumId);
      },
      tracks() {
        if (!this.album) return [];
        return this.album.tracks;
      },
    },
    methods: {
      ...mapActions(['getTracksByAlbum', 'play', 'playAll', 'addToQueue']),
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
