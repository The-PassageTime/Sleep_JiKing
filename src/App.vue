<template>
  <HeadFirst></HeadFirst>
  <router-view></router-view>
  <FootContent></FootContent>
</template>

<script lang="ts" setup>
import HeadFirst from "./View/HeadFirst.vue";
import FootContent  from "./View/FootContent.vue";
</script>

<style>
#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
 vertical-align: middle;
}
*{
  margin: 0;
}
</style>
