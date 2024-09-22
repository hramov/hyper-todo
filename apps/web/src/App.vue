<script setup lang="ts">
import { onMounted, ref } from "vue";
import Day from "./components/tabs/day/Day.vue";
import Week from "./components/tabs/week/Week.vue";
import AddTask from "./components/add-task/AddTask.vue";

const tab = ref("one");

const items = ref([]);

const dialog = ref(false);

onMounted(async () => {
  fetch("http://localhost:5000/items")
    .then((res) => res.json())
    .then((data) => {
      items.value = data;
    });
});
</script>

<template>
  <v-card style="height: 100vh">
    <v-tabs v-model="tab" bg-color="dark" grow>
      <v-tab value="one">Day</v-tab>
      <v-tab value="two">Week</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one"><Day /></v-tabs-window-item>
        <v-tabs-window-item value="two"><Week /></v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>

  <v-btn
    icon="mdi-plus"
    style="position: absolute; right: 20px; bottom: 20px"
    color="primary"
    @click="dialog = true"
  ></v-btn>

  <AddTask :dialog="dialog" @close="dialog = false" />
</template>
