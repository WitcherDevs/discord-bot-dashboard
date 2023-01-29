<script setup>
import Navbar from '@/components/Navbar.vue';
import Musicbar from '@/components/Musicbar.vue';
</script>

<template>
  <main>
    <div>
      <!-- <Navbar :userData="this.data"/> -->
      <Navbar/>
      <div class="homediv">
        <div class="text">
          <h1 class="textitle">ABOUT</h1>
          <hr class="line">
          <p class="textdesc">
            This site was created by Witcher for personal purposes. You can access more information with the menu at the top.
          </p>
        </div>
        <div class="musicdiv">
          <Musicbar class="musicbar"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import '@/assets/css/homepage.css';

export default {
  mounted() {
    this.$store.commit('updateLoading', false);
  }
}
</script>

<style>
</style>
