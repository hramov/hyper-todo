<script setup lang="ts">
import { onMounted, ref } from "vue";
import Task from "../../task/Task.vue";

const items = ref([]);

onMounted(async () => {
  fetch("http://localhost:5000/items")
    .then((res) => res.json())
    .then((data) => {
      items.value = data;
    });
});
</script>

<template>
  <v-card-subtitle>Tasks for today</v-card-subtitle>
  <v-list :items="items" lines="three" item-props style="padding: 0">
    <Task
      kind="ed"
      title="Learn Vue"
      description="Learn Vue Learn Vue Learn Vue Learn Vue Learn Vue"
    />
    <!-- <template v-slot:subtitle="{ subtitle }">
      <div v-html="subtitle"></div>
    </template> -->
  </v-list>
</template>
