<template>
  <div class="login"><Login /></div>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
export default {
  name: "LoginView",
  components: { Login },
};
</script>

<style scoped>
.login {
  background-image: url("../../public/galaxy_bg.jpg");
  background-size: cover;
  height: fit-content;
}
</style>
