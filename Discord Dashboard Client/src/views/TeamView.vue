<script setup>
import Navbar from '../components/Navbar.vue';
import '@/assets/css/teamspage.css';
</script>

<template>
  <main>
    <Navbar/>
    <div class="cards">
      <div class="cardiv" v-for="key in teamusers" :key="key">
        <div class="card">
          <img :src="key.profilePic" alt="pp" class="profilephoto">
          <h2 class="name">{{ key.name }}</h2>
          <hr class="teamline">
          <h1 class="role">{{ key.role }}</h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        teamusers: [
          {
            profilePic: "https://cdn.discordapp.com/avatars/299955838368612353/a_b5c4b0f9021fa158a3165a68ff8e2302.gif?size=2048",
            name: "Witcher",
            role: "Developer",
          },
          {
            profilePic: "https://cdn.discordapp.com/avatars/526000000602472448/a_079af3dc6d4f6c9972bdd5c9bdb9013d.gif?size=2048",
            name: "Yashinu",
            role: "Developer"
          },
          {
            profilePic: "https://cdn.discordapp.com/avatars/1001025106795057202/b22b403bb8a560c796ae5e2e829ca548.webp?size=2048",
            name: "Parzival",
            role: "Developer"
          }
        ]
      }
    },
    mounted() {
      this.$store.commit('updateLoading', false);
    }
  }
</script>
