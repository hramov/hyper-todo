<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps(["dialog"]);
const emit = defineEmits(["save", "close"]);

const task = reactive({
  period: "ed",
  category: null,
  title: "",
  description: "",
  date_start: new Date(),
  date_end: new Date(),
  duration: null,
  deadline: null,
});
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog
      :model-value="props.dialog"
      @update:model-value="emit('close')"
      transition="dialog-bottom-transition"
      fullscreen
    >
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="emit('close')"></v-btn>

          <v-toolbar-title>Add task</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text="Save" variant="text" @click="emit('save')"></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form style="padding: 10px">
          <v-tabs
            v-model="task.period"
            bg-color="dark"
            grow
            style="margin-bottom: 10px"
          >
            <v-tab value="ed">Every day</v-tab>
            <v-tab value="ew">Every week</v-tab>
          </v-tabs>

          <v-select label="Category" v-model="task.category"></v-select>

          <v-text-field
            v-model="task.title"
            label="Title"
            required
          ></v-text-field>

          <v-textarea
            v-model="task.description"
            label="Description"
            required
          ></v-textarea>

          <div style="display: flex; gap: 10px">
            <v-date-input
              v-model="task.date_start"
              label="Date start"
              required
              prepend-icon="mdi-calendar"
            ></v-date-input>

            <v-date-input
              v-model="task.date_end"
              label="Date end"
              required
              prepend-icon="mdi-calendar-check"
            ></v-date-input>
          </div>

          <div style="display: flex; gap: 10px">
            <v-text-field
              style="width: 45%"
              v-model="task.duration"
              type="time"
              label="Duration"
              required
              prepend-icon="mdi-timer"
            ></v-text-field>

            <v-text-field
              style="width: 45%"
              v-model="task.deadline"
              type="time"
              label="Deadline"
              required
              prepend-icon="mdi-timer-alert"
            ></v-text-field>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
