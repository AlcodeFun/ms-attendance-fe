<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-break-point="1000"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
  >
    <v-list dense nav>
      <!-- User Area -->
      <div class="profile-info d-flex flex-column" style="gap: 18px">
        <img
          style="border-radius: 50%; width: 120px; height: 120px; margin: auto"
          :src="getUser?.urlprofile || require('@/assets/avatar.png')"
        />
        <h2 style="font-size: 20px; font-weight: 600; text-align: center">
          {{ getUser?.name || "Name" }}
        </h2>
      </div>

      <!-- User Area -->
      <hr style="background-color: white" />

      <!-- Sidebar Items -->
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :active-class="activeClass"
        link
        :class="{ 'custom-active-class': isActive(item) }"
      >
        <v-list-item-icon>
          <component :is="item.icon" :size="20" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title style="text-align: start">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <hr style="background-color: white" />
      <v-list-item>
        <v-list-item-icon>
          <LogoutIcon />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title style="text-align: start"
            >Logout</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <!-- Sidebar Items -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AdminIcon from "@/components/Icon/Admin.vue";
import DashboardIcon from "@/components/Icon/Dashboard.vue";
import AbsensiIcon from "@/components/Icon/Absensi.vue";
import GajiIcon from "@/components/Icon/Gaji.vue";
import LogoutIcon from "@/components/Icon/Logout.vue";
import UserIcon from "@/components/Icon/User.vue";

export default {
  name: "Sidebar",
  components: {
    AdminIcon,
    DashboardIcon,
    AbsensiIcon,
    GajiIcon,
    LogoutIcon,
    UserIcon,
  },
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: [
      {
        title: "Home Dashboard",
        icon: "DashboardIcon",
        to: "/dashboard/home",
      },
      {
        title: "Absensi",
        icon: "AbsensiIcon",
        to: "/absensi/home",
      },
      {
        title: "Management User",
        icon: "UserIcon",
        to: "/manage-user/home",
      },
      {
        title: "Admin",
        icon: "AdminIcon",
        to: "/admin/home",
      },
      {
        title: "Rekap Gaji",
        icon: "GajiIcon",
        to: "/rekap-gaji/home",
      },
    ],
    activeClass: "custom-active-class", // Custom active class for active items
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    ...mapGetters(["getUser"]), // Fetch user information from the store

    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
    isActive() {
      return (item) => {
        const currentRoute = this.$route.path;
        return currentRoute === item.to || currentRoute.startsWith(item.to);
      };
    },
  },
  mounted() {
    const contentElement = this.$el.querySelector(
      ".v-navigation-drawer__content"
    );

    function handleScroll() {
      contentElement.classList.add("scrolling");
      clearTimeout(contentElement.scrollTimeout);
      contentElement.scrollTimeout = setTimeout(() => {
        contentElement.classList.remove("scrolling");
      }, 1000); // Hide scrollbar thumb after 1 second of inactivity
    }

    contentElement.addEventListener("scroll", handleScroll);
  },
};
</script>

<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);

  .v-navigation-drawer__border {
    display: none;
  }

  .v-list-item__icon {
    margin-right: 4px !important;
  }
  a {
    text-decoration: none;
    margin-bottom: 10px;
  }
  .v-navigation-drawer__content {
    overflow: auto; /* Enable scrolling */
  }

  /* Existing scrollbar styling */
  .v-navigation-drawer__content::-webkit-scrollbar {
    width: 2px;
  }

  .v-navigation-drawer__content::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  /* Custom active class styles */
  .custom-active-class {
    background-color: #a14fbc !important; /* Custom background color */
    color: #ffffff !important; /* Custom text color */

    /* Apply border to active items */
    border-radius: 4px;
    border: 1px solid #a14fbc;

    .v-icon {
      color: #ffffff !important; /* Custom icon color */
    }
  }
}
</style>
