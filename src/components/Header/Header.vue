<template>
  <v-app-bar app clipped-left clipped-right light>
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <LogoBlack style="width: 100%" />
      </span>
    </v-toolbar-title>
    <v-app-bar-nav-icon class="d-block" @click="toggleSidebar" />
    <v-spacer />
    <!-- Right part -->
    <div class="profile-info d-flex p-2 mt-3" style="gap: 10px">
      <img
        class="align-items-center"
        width="40"
        height="40"
        style="border-radius: 30px"
        :src="getUser?.urlprofile || require('@/assets/avatar.png')"
        alt="profile"
      />
      <div class="profile-desc d-flex flex-column">
        <h6 style="margin: 0; font-size: 16px">
          {{ getUser?.username || "Username" }}
        </h6>
        <p class="text-start">{{ getUser?.position || "Position" }}</p>
      </div>
    </div>

    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          class="me-3"
          icon
          v-on="on"
          style="border: 0.2px solid #5c5c5c; width: 18px; height: 18px"
        >
          <v-icon size="medium">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in userprofile"
          :key="i"
          @click="item.title === 'Logout' ? confirmLogout() : href(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import LogoBlack from "@/components/Icon/LogoBlack.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 CSS

export default {
  name: "Header",
  components: { LogoBlack },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    userprofile: [
      { title: "My Profile" },
      { title: "Logout" }, // Add Logout option
    ],
  }),
  computed: {
    ...mapState(["Sidebar_drawer"]),
    ...mapGetters(["getUser"]), // Fetch user information from the store
  },
  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    ...mapActions(["logout", "fetchUserData"]), // Add fetchUserData

    toggleSidebar() {
      this.setSidebarDrawer(!this.Sidebar_drawer);
    },

    // Set href based on user role
    href(title) {
      if (title === "My Profile") {
        const route =
          this.getUser?.role === "admin"
            ? "/admin/profile"
            : "/employee/profile";
        this.$router.push({ path: route });
      }
    },

    // Confirm logout with SweetAlert2
    async confirmLogout() {
      const result = await this.$swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your session.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        this.handleLogout();
      }
    },

    async handleLogout() {
      try {
        await this.logout(this.$router); // Call logout action
        if (this.$route.name !== "login") {
          this.$router.push({ name: "login" });
        }
        this.$swal.fire("Logged Out", "You have been logged out.", "success");
      } catch (error) {
        console.error("Logout failed:", error);
        this.$swal.fire("Error", "Logout failed. Please try again.", "error");
      }
    },
  },
  async mounted() {
    try {
      await this.fetchUserData(this.$router); // Fetch user data on mount
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
};
</script>
