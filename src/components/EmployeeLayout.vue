<template>
  <div>
    <Header v-model="expandOnHover"></Header>
    <Sidebar :expand-on-hover.sync="expandOnHover"></Sidebar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>
    
    <script>
import Header from "@/components/Header/Header.vue";
import Sidebar from "@/components/Sidebar/EmployeeSidebar.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "EmployeeLayout",

  components: {
    Header,
    Sidebar,
  },

  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState(["Customizer_drawer"]),
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },
};
</script>
    