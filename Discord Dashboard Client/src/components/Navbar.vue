<script>
import '@/assets/css/navbar.css';
export default {
  data() {
    return {
      isMenuOpen: false,
      data: this.$store.state,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    loginHref() {
      window.location.href = 'http://localhost:3000/api/auth/'
    },
    logoutFunction() {
      this.$store.commit('updateUser', null);
      window.location.href =  'http://localhost:3000/api/auth/logout';
    }
  },
}

</script>

<template>
  <nav>
    <div class="navbar">
      <RouterLink to="/" class="navbarhome">
        <img class="witcherlogo" src="../assets/witcher-logo.png" alt="Logo">
      </RouterLink>
      <div class="content">
        <RouterLink to="/teams" class="navbarabout">Teams</RouterLink>
        <RouterLink to="/" class="navbarteams">Projects</RouterLink>
        <RouterLink to="/dashboard" class="navbardashboard">Dashboard</RouterLink>
      </div>
      <button class="loginbutton" @click="loginHref" v-if="!this.data.logged">Login</button>
      <div v-else>
        <button class="discordname" @click="toggleMenu">{{ this.data.user.username }}</button>
        <div class="dropdownmenu" v-if="isMenuOpen"> 
            <button class="logoutbutton" @click ="logoutFunction">Logout</button>
        </div>
      </div>

    </div>
  </nav>
</template>