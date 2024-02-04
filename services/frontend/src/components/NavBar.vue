<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="block-title" color="purple darken-2">
      <v-icon class="negative-logo">
        <v-img :src="logo" max-height="24" max-width="24"></v-img>
      </v-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title v-if="isLoggedIn">
      Hola: {{ stateUser.full_name }}
    </v-toolbar-title>
    <v-btn :to="'/login'" v-if="!isLoggedIn">Login</v-btn>
    <v-btn :to="'/register'" v-if="!isLoggedIn"> Registre </v-btn>
    <v-btn @click="logout" variant="elevated" v-if="isLoggedIn">Logout</v-btn>
  </v-app-bar>

  <v-navigation-drawer app v-model="drawer" permanent>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.route">
        <v-list-item-icon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue';
// eslint-disable-next-line
import logo from '@/assets/pluton-logo.png';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const drawer = ref(true);

const menuItems = [
  { title: 'Listado de resultados', route: '/dashboard', logged: true },
  { title: 'Carga de resultados', route: '/dashboard', logged: true },
  { title: 'My Profile', route: '/profile', logged: true },
];

const isLoggedIn = computed(() => store.getters.isAuthenticated);

const stateUser = computed(() => store.getters.stateUser);

const logout = async () => {
  await store.dispatch('logOut');
  await router.push('/login');
};
</script>

<style scoped>
.block-title {
  display: flex;
  align-items: center;
}

.negative-logo img {
  filter: invert(100%);
}
</style>
