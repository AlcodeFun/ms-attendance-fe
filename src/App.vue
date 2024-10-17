<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

h1,
h2,
h3,
h4,
h5,
p,
div,
a {
  font-family: "Poppins";
}
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f6fa;

  color: #2c3e50;
}

.v-toolbar__content {
  z-index: 99;
}
nav {
  padding: 30px;
  z-index: 99;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.theme--dark.v-navigation-drawer {
  background-color: #562266 !important;
}
</style>
