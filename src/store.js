import Vue from "vue";
import Vuex from "vuex";
import { apiLogin, apiLogout, fetchUserData } from "@/api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: '#562266',
    SidebarBg: '',
    user: JSON.parse(localStorage.getItem("user")) || null,
    sessionInterval: null,  // Interval ID for session checking
  },
  mutations: {
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    CLEAR_SESSION_INTERVAL(state) {
      if (state.sessionInterval) {
        clearInterval(state.sessionInterval);  // Clear any existing interval
        state.sessionInterval = null;
      }
    },
    SET_SESSION_INTERVAL(state, intervalId) {
      state.sessionInterval = intervalId;
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const userData = await apiLogin(credentials);
        commit("SET_USER", userData);
        dispatch("startSessionCheck");  // Start session check after login
        return userData;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }, router) {
      try {
        // Try logging out via API only if session is valid
        await apiLogout();  // Call logout API
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.warn('Session already expired, skipping API logout.');
        } else {
          console.error('Logout API failed:', error);
        }
      } finally {
        // Clear session state and handle the redirect
        commit("LOGOUT");
        commit("CLEAR_SESSION_INTERVAL");  // Clear session check interval

        // Check if router is available and ensure we're not already on the login page
        if (router && router.currentRoute.name !== "login") {
          router.push({ name: "login" }).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              console.error(err);
            }
          });
        }
      }
    },
    async fetchUserData({ commit, dispatch }, router) {
      try {
        const response = await fetchUserData();  // Fetch user data from /me endpoint
        commit("SET_USER", response.user);
        return response.user;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If unauthorized, log the user out and redirect to login
          dispatch("logout", router);  // Pass the router instance
        }
        throw error;
      }
    },
    startSessionCheck({ dispatch, commit }, router) {
      // Clear any existing interval
      commit("CLEAR_SESSION_INTERVAL");

      // Set an interval to check session every 5 minutes (300000ms)
      const intervalId = setInterval(async () => {
        try {
          await dispatch("fetchUserData", router);  // Attempt to refresh session
        } catch (error) {
          // If session expired, logout is handled by fetchUserData
        }
      }, 300000);  // 5 minutes

      // Store the interval ID
      commit("SET_SESSION_INTERVAL", intervalId);
    },
  },
  getters: {
    getUser: (state) => {
      return state.user ? state.user : { role: "guest" }; // Default to guest if no user
    },
    isLoggedIn: (state) => !!state.user,
  },
});
