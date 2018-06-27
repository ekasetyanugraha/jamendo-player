<template>
  <transition name="fade" mode="out-in">
    <div class="columns is-multiline" v-if="albums.length">
      <div v-for="album in albums" :key="album.id" class="column is-one-fifth is-mobile">
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
    name: 'Albums',
    computed: {
      ...mapState({
        albums: state => state.Album.albums,
      }),
    },
    methods: {
      ...mapActions(['getAlbums', 'getAlbumTracks']),
      getMoreAlbums() {
        if (!this.loading) {
          const app = document.getElementById('app');
          if ((window.innerHeight + window.pageYOffset) >= app.offsetHeight) {
            this.getAlbums().then(() => {
              this.loading = false;
            });
          }
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
      window.addEventListener('scroll', this.getMoreAlbums);
    },
    destroyed() {
      window.removeEventListener('scroll', this.getMoreAlbums);
    },
  };
</script>
