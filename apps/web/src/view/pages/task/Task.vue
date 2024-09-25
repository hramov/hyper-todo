<script setup lang="ts">
import { onMounted, ref } from "vue";
import Task from "./components/SingleTask.vue";
import { useTaskStore } from "../../../store/task.store";
import { useCategoryStore } from "../../../store/category.store";
import { useAccountStore } from "../../../store/account.store";
import SaveTaskDialog from "./components/SaveTaskDialog.vue";

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();
const accountStore = useAccountStore();

const loaded = ref(true);
const dialog = ref(false);

const task = ref<any>({});

onMounted(async () => {
  loaded.value = false;
  categoryStore.getCategories(accountStore.user.id);
  taskStore.getTasks(accountStore.user.id);
  loaded.value = true;
});

const saveTask = async (task: any) => {
  await taskStore.saveTask(task, accountStore.user.id);
  dialog.value = false;
  await taskStore.getTasks(accountStore.user.id);
};

const openTask = (id: number) => {
  task.value = taskStore.findTaskById(id);
  if (task.value.id) {
    dialog.value = true;
  }
};

const completeTask = async (id: number) => {
  await taskStore.setCompleted(id);
  await taskStore.getTasks(accountStore.user.id);
};

const deleteTask = async (id: number) => {
  await taskStore.deleteTask(id);
  await taskStore.getTasks(accountStore.user.id);
};
</script>

<template>
  <div>
    <v-card-subtitle>Задачи на сегодня</v-card-subtitle>
    <Task
      v-for="task in taskStore.pendingTasks"
      :id="task.id"
      :title="task.title"
      :description="task.description"
      :status="task.status"
      :duration="task.duration"
      :deadline="task.deadline"
      :category="task.category"
      @complete="completeTask"
      @delete="deleteTask"
      @open="openTask"
    />

    <div v-if="taskStore.pendingTasks.length === 0">
      <v-banner
        class="my-4"
        color="green"
        icon="mdi-check"
        lines="one"
        style="border-radius: 5px"
      >
        <v-banner-text>Отлично! Кажется, на сегодня все!</v-banner-text>
      </v-banner>
    </div>

    <div v-if="taskStore.completedTasks.length > 0">
      <v-card-subtitle style="margin-top: 20px"
        >Выполненные задачи</v-card-subtitle
      >
      <Task
        v-for="task in taskStore.completedTasks"
        :id="task.id"
        :title="task.title"
        :description="task.description"
        :status="task.status"
        :duration="task.duration"
        :deadline="task.deadline"
        :category="task.category"
        @complete="completeTask"
        @delete="deleteTask"
        @open="openTask"
      />
    </div>

    <v-btn
      icon="mdi-plus"
      style="position: fixed; right: 20px; bottom: 70px"
      color="primary"
      @click="dialog = true"
    ></v-btn>

    <SaveTaskDialog
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
