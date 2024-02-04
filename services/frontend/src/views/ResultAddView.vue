<template>
  <div>
    <section>
      <h1>Add new note</h1>
      <hr />
      <br />

      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input
            type="text"
            name="title"
            v-model="form.title"
            class="form-control" />
        </div>
        <div class="mb-3">
          <label for="content" class="form-label">Content:</label>
          <textarea
            name="content"
            v-model="form.content"
            class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'ResultAdd',
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
    };
  },
  created: function () {
    return this.$store.dispatch('getNotes');
  },
  computed: {
    ...mapGetters({ notes: 'stateNotes' }),
  },
  methods: {
    ...mapActions(['createNote']),
    async submit() {
      await this.createNote(this.form);
    },
  },
});
</script>
