<script setup lang="ts">
import { computed } from "vue";
import Task from "../../task/Task.vue";
const props = defineProps(["tasks"]);
const emit = defineEmits(["open", "complete", "delete"]);

const completedTasks = computed(() =>
  props.tasks.filter((t: any) => t.status === "completed")
);

const pendingTasks = computed(() =>
  props.tasks.filter((t: any) => t.status !== "completed")
);
</script>

<template>
  <div>
    <v-card-subtitle>Задачи на сегодня</v-card-subtitle>
    <Task
      v-for="task in pendingTasks"
      :id="task.id"
      :title="task.title"
      :description="task.description"
      :status="task.status"
      :duration="task.duration"
      :deadline="task.deadline"
      :category="task.category"
      @complete="emit('complete', task.id)"
      @delete="emit('delete', task.id)"
      @open="emit('open', task.id)"
    />

    <div v-if="pendingTasks.length === 0">
      <v-banner
        class="my-4"
        color="green"
        icon="mdi-check"
        lines="one"
        style="border-radius: 5px"
      >
        <v-banner-text>Great! Seems like you're all done!</v-banner-text>
      </v-banner>
    </div>

    <div v-if="completedTasks.length > 0">
      <v-card-subtitle style="margin-top: 20px"
        >Completed tasks</v-card-subtitle
      >
      <Task
        v-for="task in completedTasks"
        :id="task.id"
        :title="task.title"
        :description="task.description"
        :status="task.status"
        :duration="task.duration"
        :deadline="task.deadline"
        :category="task.category"
        @complete="emit('complete', task.id)"
        @delete="emit('delete', task.id)"
        @open="emit('open', task.id)"
      />
    </div>
  </div>
</template>
