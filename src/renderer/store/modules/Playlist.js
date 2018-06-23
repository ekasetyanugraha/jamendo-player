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
  PLAY_NEXT(state) {
    if (state.queue.length > 1) {
      state.queue = state.queue.slice(1);
      state.currentlyPlaying = state.queue[0];
    }
  },
};

const actions = {
  play({ commit }, track) {
    commit('SET_QUEUE', [track]);
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
