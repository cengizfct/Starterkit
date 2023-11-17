const state = {
  logo: '',
  appLoaded: false,
  authMessage: {
    status: false,
    message: "",
    variant: "",
  }, // Uygulamada eğer authorization işlemlerinde problem varsa hata mesajı döner.
  appActionModal: {
    status: false,
    isLoading: false,
    message: "Bir yeni mesaj",
    variant: "info",
  }, // herhangi bir async işlemde yaşanacak problemlerde gösterilen alert modal'ı // 2. herhangi bir işlem işlem durumunu gösteren modal.
};
const getters = {
  getAppLoaded: (state) => state.appLoaded,
  getLogo: (state) => state.logo,
  getAuthMessage: (state) => state.authMessage,
  getActionModal: (state) => state.appActionModal,
};
const mutations = {
  //  default layout: Uygulama tamamen yüklendi ise.
  SET_APP_LOADED(state, payload) {
    state.appLoaded = payload;
  },
  // Uygulamada eğer authorization işlemlerinde problem varsa hata mesajı döner.
  SET_AUTH_MESSAGE(state, payload) {
    state.authMessage = payload;
  },
  // 1. herhangi bir async işlemde yaşanacak problemlerde gösterilen alert modal'ı
  // 2. herhangi bir işlem işlem durumunu gösteren modal.
  SET_ACTION_MODAL(state, payload) {
    state.appActionModal = payload;
  },
  SET_RESET_ACTION_MODAL(state) {
    state.appActionModal = {
      status: false,
      isLoading: false,
      message: "",
      variant: "",
    };
  },
};

const actions = {
  // herhangi bir async işlemde yaşanacak problemlerde gösterilen alert modal'ı
  // tüm async işlemlerde durumun sonucunu gösteren alert.
  SET_ACTION_MODAL({ commit }, payload) {
    commit("SET_ACTION_MODAL", payload);
    setTimeout(() => {
      commit("SET_RESET_ACTION_MODAL");
    }, payload.duration || 4000);
  },
  // async işlem modal ile loading gösterimi.
  SET_ACTION_MODAL_LOADING({ commit }) {
    commit("SET_RESET_ACTION_MODAL", {
      status: true,
      isLoading: true,
      message: "Bir yeni mesaj",
      variant: "",
    });
  },
};

export default { state, getters, mutations, actions };


