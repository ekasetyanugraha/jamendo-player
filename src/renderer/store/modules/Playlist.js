const state = {
  queue: [],
  currentlyPlaying: {},
};

const mutations = {
  SET_QUEUE(state, queue) {
    state.queue = queue;
    state.currentlyPlaying = state.queue[0];
  },
  ADD_TO_QUEUE(state, track) {
    state.queue.push(track);
  },
  PLAY_PREV(state) {
    const currentIndex = state.queue.findIndex(track => track.id === state.currentlyPlaying.id);
    if (currentIndex > 0) {
      state.currentlyPlaying = state.queue[currentIndex - 1];
    }
  },
  PLAY_NEXT(state) {
    const currentIndex = state.queue.findIndex(track => track.id === state.currentlyPlaying.id);
    if (currentIndex < (state.queue.length - 1)) {
      state.currentlyPlaying = state.queue[currentIndex + 1];
    }
  },
};

const actions = {
  play({ commit }, track) {
    commit('SET_QUEUE', [track]);
  },
  playPrev({ commit }) {
    commit('PLAY_PREV');
  },
  playNext({ commit }) {
    commit('PLAY_NEXT');
  },
  playAll({ commit }, tracks) {
    commit('SET_QUEUE', tracks);
  },
  addToQueue({ commit }, track) {
    commit('ADD_TO_QUEUE', track);
  },
};

export default {
  state,
  mutations,
  actions,
};
