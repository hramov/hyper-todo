<script setup lang="ts">
import Task from "../../task/Task.vue";
const props = defineProps(["tasks"]);
const emit = defineEmits(["open"]);
</script>

<template>
  <div>
    <v-card-subtitle>Tasks for today</v-card-subtitle>
    <Task
      v-for="task in props.tasks"
      :title="task.title"
      :description="task.description"
      @click="emit('open', task.id)"
    />
  </div>
</template>
