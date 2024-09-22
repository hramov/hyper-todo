<script setup lang="ts">
import { onMounted, ref } from "vue";

const items = ref([]);

onMounted(async () => {
  fetch("https://webapp.hramovdev.ru/api/items")
    .then((res) => res.json())
    .then((data) => {
      items.value = data;
    });
});
</script>

<template>
  <v-list :items="items" lines="three" item-props style="padding: 0">
    <template v-slot:subtitle="{ subtitle }">
      <div v-html="subtitle"></div>
    </template>
  </v-list>
</template>
