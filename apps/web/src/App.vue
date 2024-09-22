<script setup lang="ts">
import { onMounted, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const hello = ref("");

const drawer = ref(false);

const tab = ref("one");

const items = ref([]);

onMounted(async () => {
  fetch("/api/items")
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
      <v-tab value="three">Month</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <v-list :items="items" lines="three" item-props style="padding: 0">
            <template v-slot:subtitle="{ subtitle }">
              <div v-html="subtitle"></div>
            </template>
          </v-list>
        </v-tabs-window-item>

        <v-tabs-window-item value="two"> Two </v-tabs-window-item>

        <v-tabs-window-item value="three"> Three </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>

  <v-btn
    icon="mdi-plus"
    style="position: absolute; right: 20px; bottom: 20px"
    color="primary"
  ></v-btn>
</template>
