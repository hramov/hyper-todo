<script setup lang="ts">
import { onMounted, ref } from "vue";
import Task from "../../task/Task.vue";

const items = ref([]);

onMounted(async () => {
  fetch(import.meta.env.VITE_APP_API_URL + "/api/items")
    .then((res) => res.json())
    .then((data) => {
      items.value = data;
    });
});
</script>

<template>
  <div>
    <v-card-subtitle>Tasks for today</v-card-subtitle>
    <v-list
      :items="items"
      lines="three"
      item-props
      style="padding: 0; background-color: rgb(57, 54, 50)"
    >
      <Task
        v-for="i in 3"
        kind="ed"
        title="Learn Vue"
        description="Learn Vue Learn Vue Learn Vue Learn Vue Learn Vue"
      />
    </v-list>
  </div>
</template>
