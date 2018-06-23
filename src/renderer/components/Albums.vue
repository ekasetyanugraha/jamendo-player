<template>
  <transition-group name="list" tag="div" class="columns is-multiline">
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
  </transition-group>
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
      this.getAlbums();
    },
  };
</script>
