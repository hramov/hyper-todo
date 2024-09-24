<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["complete", "delete", "open"]);

const props = defineProps([
  "id",
  "title",
  "description",
  "status",
  "duration",
  "deadline",
  "category",
]);

const doneButton = ref(false);
const deleteButton = ref(false);

const swipe = (direction: "Left" | "Right") => {
  if (direction === "Right") {
    if (!deleteButton.value && props.status !== "completed") {
      doneButton.value = true;
    } else {
      deleteButton.value = false;
    }
  } else {
    if (!doneButton.value) {
      deleteButton.value = true;
    } else {
      doneButton.value = false;
    }
  }
};

const minutesToHoursAndMinutes = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}:${minutes}`;
};
</script>

<template>
  <v-card
    class="task"
    elevation="5"
    density="compact"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
    }"
    :class="{
      pending: props.status === 'pending',
      expired: props.status === 'expired',
      completed: props.status === 'completed',
    }"
  >
    <div class="content" @click="emit('open', props.id)">
      <v-expand-transition
        ><v-btn
          v-if="doneButton"
          color="green"
          style="height: auto; width: 10%"
          @click.stop="emit('complete', props.id)"
          ><v-icon>mdi-check</v-icon></v-btn
        ></v-expand-transition
      >
      <div class="description">
        <small>#{{ props.category.title }}</small>
        <v-card-title>{{ props.title }}</v-card-title>
        <v-card-text>{{ props.description }}</v-card-text>
      </div>
      <div class="time">
        <div>
          <v-icon color="green">mdi-timer</v-icon>
          {{ minutesToHoursAndMinutes(props.duration) }}
        </div>
        <div>
          <v-icon color="red">mdi-timer-alert</v-icon> {{ props.deadline }}
        </div>
      </div>
      <v-expand-transition
        ><v-btn
          v-if="deleteButton"
          @click.stop="emit('delete', props.id)"
          color="red"
          style="height: auto; width: 10%"
          ><v-icon>mdi-delete</v-icon></v-btn
        ></v-expand-transition
      >
    </div>
  </v-card>
</template>

<style scoped>
.time {
  width: 30%;
  height: 100%;
  margin: auto 0;
}

.time > div {
  margin-bottom: 5px;
}

.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.task {
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
}

.completed {
  background-color: rgb(147, 186, 137);
}

.pending {
}

.expired {
  background-color: rgb(220, 119, 119);
}
</style>
