
import $api from "../../services/Api";
export const state = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const mutations = {
  SET_CURRENT_USER(state, data) {
    state.currentUser = data;
    saveState("user", data);
  },
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
};

export const actions = {
  SET_CURRENT_USER({ commit }, user) {
    const objUser = JSON.parse(user);
    commit("SET_CURRENT_USER", objUser);
    $api.token = objUser.token;
  },
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars
  init({ state, dispatch }) {
    dispatch("validate");
  },

  // Logs out the current user.
  logOut({ commit }) {
    // eslint-disable-next-line no-unused-vars
    commit("SET_CURRENT_USER", null);
    localStorage.removeItem("user");
    return true;
  },

  // register the user
  

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // eslint-disable-next-line no-unused-vars
 
};

// ===
// Private helpers
// ===

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}
