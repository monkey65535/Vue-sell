<template>
  <div id="app">
    <app-header></app-header>
    <div class="tab">
      I am tab
    </div>
    <div class="content">
      I am content
    </div>
  </div>
</template>

<script>
import AppHeader from './components/header/Header.vue';
export default {
  components: {
    AppHeader
  }
};
</script>

<style>
</style>
