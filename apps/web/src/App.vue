<script setup lang="ts">
import { ref, onMounted } from "vue";
import Day from "./components/tabs/day/Day.vue";
import AddTask from "./components/add-task/AddTask.vue";
import { useAppStore } from "./store/store";

const appStore = useAppStore();
const loaded = ref(true);
const page = ref("tasks");
const dialog = ref(false);
const task = ref<any>({});

const telegramData = ref<{ user?: any }>({});

onMounted(async () => {
  loaded.value = false;
  telegramData.value = (window as any).Telegram.WebApp?.initDataUnsafe;
  await appStore.getUser(telegramData.value.user);
  await appStore.getCategories();
  await appStore.getTasks();
  loaded.value = true;
});

const saveTask = async (task: any) => {
  await appStore.saveTask(task);
  dialog.value = false;
  await appStore.getTasks();
};

const openTask = (id: number) => {
  task.value = appStore.tasks.find((task: any) => task.id === id);
  if (task.value.id) {
    dialog.value = true;
  }
};

const completeTask = async (id: number) => {
  await appStore.setCompleted(id);
  await appStore.getTasks();
};

const deleteTask = async (id: number) => {
  await appStore.deleteTask(id);
  await appStore.getTasks();
};
</script>

<template>
  <div>
    <v-card class="container" v-if="appStore.user.id">
      <v-card-text>
        <Day
          v-if="loaded"
          :tasks="appStore.tasks"
          @open="openTask"
          @complete="completeTask"
          @delete="deleteTask"
        />
      </v-card-text>
    </v-card>

    <v-skeleton-loader
      style="background-color: rgb(126, 128, 131); margin: 20px"
      type="card"
      v-else
    ></v-skeleton-loader>

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

    <AddTask
      :dialog="dialog"
      @close="
        task = {};
        dialog = false;
      "
      @save="saveTask"
      :task="task"
      :key="task.id"
    />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 52px);
  background-color: rgb(57, 54, 50);
}
</style>
