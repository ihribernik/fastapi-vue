<template>
  <div v-if="result">
    <p><strong>Title:</strong> {{ result.title }}</p>
    <p><strong>Content:</strong> {{ result.content }}</p>
    <p><strong>Author:</strong> {{ result.author.username }}</p>

    <div v-if="user.id === result.doctor.id">
      <p>
        <router-link
          :to="{ name: 'ResultEdit', params: { id: result.id } }"
          class="btn btn-primary"
          >Edit</router-link
        >
      </p>
      <p>
        <button @click="removeResult()" class="btn btn-secondary">
          Delete
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Result',
  props: ['id'],
  async created() {
    try {
      await this.viewResult(this.id);
    } catch (error) {
      console.error(error);
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters({ result: 'stateResult', user: 'stateUser' }),
  },
  methods: {
    ...mapActions(['viewResult', 'deleteResult']),
    async removeResult() {
      try {
        await this.deleteResult(this.id);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
