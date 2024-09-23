<script setup lang="ts">
import { ref } from "vue";

const props = defineProps([
  "kind",
  "title",
  "description",
  "status",
  "priority",
  "dueDate",
  "assignedTo",
  "assignedBy",
]);

const doneButton = ref(false);
const deleteButton = ref(false);

const swipe = (direction: "Left" | "Right") => {
  if (direction === "Right") {
    if (!deleteButton.value) {
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
  >
    <div class="content">
      <v-expand-transition
        ><v-btn
          v-if="doneButton"
          color="green"
          style="height: 100px; width: 10%"
          ><v-icon>mdi-check</v-icon></v-btn
        ></v-expand-transition
      >
      <div class="description">
        <v-card-title>{{ props.title }}</v-card-title>
        <v-card-text>{{ props.description }}</v-card-text>
      </div>
      <div class="time">
        <div><v-icon color="green">mdi-timer</v-icon> 01:00</div>
        <div><v-icon color="red">mdi-timer-alert</v-icon> 21:00</div>
      </div>
      <v-expand-transition
        ><v-btn
          v-if="deleteButton"
          color="red"
          style="height: 100px; width: 10%"
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
  background-color: rgb(126, 128, 131);
}
</style>
