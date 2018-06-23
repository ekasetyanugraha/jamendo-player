const state = {
  queue: [],
};

const mutations = {
  SET_QUEUE(state, queue) {
    state.queue = queue;
  },
  ADD_TO_QUEUE(state, audio) {
    state.queue.push(audio);
  },
};

const actions = {
  play({ commit }, audio) {
    commit('SET_QUEUE', [audio]);
  },
  addToQueue({ commit }, audio) {
    commit('ADD_TO_QUEUE', audio);
  },
};

export default {
  state,
  mutations,
  actions,
};
