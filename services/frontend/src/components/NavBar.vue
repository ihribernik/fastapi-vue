<template>
  <v-app :full-height="false" class="app-bar-container">
    <v-app-bar :elevation="2">
      <!-- eslint-disable-next-line vue/valid-v-on -->
      <v-app-bar-nav-icon @click="drawer = !drawer" id="hamburger-icon">
      </v-app-bar-nav-icon>
      <v-app-bar-title>Pluton</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="notdefinedyet">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const drawer = ref(false);
    const menuItems = [
      { title: 'Listado de resultados' },
      { title: 'Carga de resultados' },
      { title: 'My Profile' },
      { title: 'Log-out' },
    ];

    return {
      drawer,
      menuItems,
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logOut');
      this.$router.push('/login');
    },
  },
});
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
