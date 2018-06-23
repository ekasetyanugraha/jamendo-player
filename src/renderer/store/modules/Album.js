import axios from 'axios';

const state = {
  albums: [],
  albumDetails: [],
};

const mutations = {
  SET_ALBUMS(state, albums) {
    state.albums = albums;
  },
  SET_ALBUM_DETAILS(state, albumDetails) {
    state.albumDetails = albumDetails;
  },
};

const actions = {
  getAlbums({ state, commit }) {
    if (!state.albums.length) {
      axios.get('https://api.jamendo.com/v3.0/albums?client_id=8ab29b05&format=json&offset=0&limit=20&order=popularity_total')
        .then(({ data }) => {
          commit('SET_ALBUMS', data.results);
          return data;
        });
    }
  },
  getTracksByAlbum({ state, commit }, albumId) {
    const found = state.albums.find(album => album.id === albumId);
    if (!found.tracks) {
      axios.get(`https://api.jamendo.com/v3.0/albums/tracks?id=${albumId}&client_id=8ab29b05&format=json&offset=0&limit=20&order=track_position`)
        .then(({ data }) => {
          commit('SET_ALBUM_DETAILS', [
            ...state.albumDetails.filter(album => album.id !== albumId),
            {
              ...found,
              tracks: data.results[0].tracks,
            },
          ]);
          return data;
        });
    }
  },
};

export default {
  state,
  mutations,
  actions,
};