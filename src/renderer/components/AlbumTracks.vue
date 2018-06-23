<template>
  <table v-if="tracks.length" class="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th style="width: 24px">No</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="track in tracks" :key="track.id" @click="play(track.audio)">
        <td>{{ track.position }}</td>
        <td>{{ track.name }}</td>
      </tr>
    </tbody>
  </table>
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
      ...mapActions(['getTracksByAlbum', 'play', 'addToQueue']),
    },
    mounted() {
      this.getTracksByAlbum(this.albumId);
    },
  };
</script>
