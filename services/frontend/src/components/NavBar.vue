<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="block-title" color="purple darken-2">
      <v-icon class="negative-logo">
        <v-img :src="logo" max-height="24" max-width="24"></v-img>
      </v-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      :to="'/login'"
      variant="elevated"
      class="mx-2"
      color="primary"
      v-if="!isLoggedIn"
      >Login</v-btn
    >
    <v-btn
      :to="'/register'"
      variant="elevated"
      color="secondary"
      v-if="!isLoggedIn">
      Register
    </v-btn>
    <v-btn
      :to="'/profile'"
      variant="elevated"
      class="mx-2"
      color="primary"
      v-if="isLoggedIn">
      Profile
    </v-btn>
    <v-btn
      @click="logout"
      variant="elevated"
      color="secondary"
      v-if="isLoggedIn">
      Logout
    </v-btn>
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
        :to="item.route"
        :active="isLoggedIn">
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
  { title: 'Listado de resultados', route: '/', logged: true },
  { title: 'Carga de resultados', route: '/result/add', logged: true },
];

const isLoggedIn = computed(() => store.getters.isAuthenticated);

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
