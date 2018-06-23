<template>
  <div class="columns is-multiline" ref="ancestor">
    <div v-for="album in albums" :key="album.id" class="column is-one-fifth">
      <div class="card">
        <div class="card-image">
          <a @click.prevent="goToAlbumTracks(album.id)">
            <figure class="image">
              <img :src="album.image" :alt="album.name"/>
            </figure>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Albums',
    computed: {
      ...mapState({
        albums: state => state.Album.albums,
      }),
    },
    methods: {
      ...mapActions(['getAlbums', 'getAlbumTracks']),
      getMoreAlbums() {
        const el = document.getElementById('app');
        if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
          this.getAlbums();
        }
      },
      goToAlbumTracks(albumId) {
        this.$router.push({
          name: 'album_tracks',
          params: {
            id: albumId,
          },
        });
      },
    },
    mounted() {
      if (!this.albums.length) this.getAlbums();
      else this.getMoreAlbums();
      document.getElementById('app').addEventListener('scroll', this.getMoreAlbums);
    },
  };
</script>
