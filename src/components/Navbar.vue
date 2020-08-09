<template>
  <div class="navbar">
    <v-app-bar app dark color="indigo darken-2">
      <v-toolbar-title class="my-auto">
        <router-link :style="{ cursor: 'pointer' }" tag="div" :to="{ name: 'Home' }">Ninja Smoothies</router-link>
      </v-toolbar-title>

      <v-btn absolute right bottom fab color="pink" :to="{ name: 'AddSmoothie' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
