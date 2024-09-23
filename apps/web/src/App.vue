<script setup lang="ts">
import { ref, onMounted } from "vue";
import Day from "./components/tabs/day/Day.vue";
import Week from "./components/tabs/week/Week.vue";
import AddTask from "./components/add-task/AddTask.vue";
import axios from "axios";
import { useAppStore } from "./store/store";

const store = useAppStore();
const loaded = ref(true);
const page = ref("tasks");
const dialog = ref(false);

onMounted(async () => {
  loaded.value = false;
  const telegramData = window.Telegram.WebApp?.initDataUnsafe;
  await store.getUser(telegramData.user);
  await store.getCategories();
  loaded.value = true;
});

const saveTask = async (task: any) => {
  const response = await axios.post("/api/create-task", {
    ...task,
    user_id: store.user.id,
  });
};
</script>

<template>
  <div>
    <v-card class="container">
      <v-card-text>
        <Day v-if="loaded" />
        <v-skeleton-loader
          style="background-color: rgb(126, 128, 131)"
          type="card"
          v-else
        ></v-skeleton-loader>
      </v-card-text>
    </v-card>

    <v-layout class="overflow-visible" style="margin-top: 20px">
      <v-bottom-navigation grow v-model="page">
        <v-btn value="tasks">
          <v-icon>mdi-star-box-outline</v-icon>

          <span>Tasks</span>
        </v-btn>

        <v-btn value="categories" disabled>
          <v-icon>mdi-shape-outline</v-icon>

          <span>Categories</span>
        </v-btn>

        <v-btn value="account" disabled>
          <v-icon>mdi-account-outline</v-icon>

          <span>Account</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>

    <v-btn
      icon="mdi-plus"
      style="position: fixed; right: 20px; bottom: 70px"
      color="primary"
      @click="dialog = true"
    ></v-btn>

    <AddTask :dialog="dialog" @close="dialog = false" @save="saveTask" />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 52px);
  background-color: rgb(57, 54, 50);
}
</style>
