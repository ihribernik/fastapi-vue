<template>
  <div>
    <section>
      <h1>Listado de resultados</h1>

      <div v-if="medicalResults">
        <v-container>
          <v-row>
            <v-col
              v-for="result in medicalResults"
              :key="result.id"
              cols="auto">
              <v-card class="elevation-12 w-auto h-auto">
                <v-card-title>Notes</v-card-title>
                <v-card-text>
                  <p><strong>Note Title:</strong> {{ result }}</p>
                  <p><strong>Author:</strong> {{ result.author.username }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn :to="{ name: 'Result', params: { id: result.id } }">
                    View
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div v-else>
        <p>Nothing to see. Check back later.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const medicalResults = computed(() => store.getters.stateResults);

onBeforeMount(() => {
  store.dispatch('getResults');
});
</script>
