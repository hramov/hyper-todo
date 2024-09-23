<script setup lang="ts">
import { reactive, ref } from "vue";

import { useAppStore } from "./../../store/store";

const props = defineProps(["dialog", "task"]);
const emit = defineEmits(["save", "close"]);

const appStore = useAppStore();

const task = reactive({
  id: props.task.id ?? null,
  period: props.task.period ?? "ed",
  cron_period: props.task.cron_period ?? {
    day: null,
    month: null,
    weekday: null,
  },
  category: props.task.category ?? null,
  title: props.task.title ?? "",
  description: props.task.description ?? "",
  date_start: props.task.date_start ?? new Date(),
  date_end: props.task.date_end ?? new Date(),
  duration: props.task.duration ?? null,
  deadline: props.task.deadline ?? null,
});

const daysOfWeek = [
  {
    label: "Monday",
    value: 1,
  },
  {
    label: "Tuesday",
    value: 2,
  },
  {
    label: "Wednesday",
    value: 3,
  },
  {
    label: "Thursday",
    value: 4,
  },
  {
    label: "Friday",
    value: 5,
  },
  {
    label: "Saturday",
    value: 6,
  },
  {
    label: "Sunday",
    value: 0,
  },
];

const daysOfMonth = Array.from(Array(32).keys()).filter((n) => n > 0);

const months = [
  {
    label: "January",
    value: 1,
  },
  {
    label: "February",
    value: 2,
  },
  {
    label: "March",
    value: 3,
  },
  {
    label: "April",
    value: 4,
  },
  {
    label: "May",
    value: 5,
  },
  {
    label: "June",
    value: 6,
  },
  {
    label: "July",
    value: 7,
  },
  {
    label: "August",
    value: 8,
  },
  {
    label: "September",
    value: 9,
  },
  {
    label: "October",
    value: 10,
  },
  {
    label: "November",
    value: 11,
  },
  {
    label: "December",
    value: 12,
  },
];

const menu = ref(false);
const menu2 = ref(false);
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
            <v-btn
              text="Save"
              variant="text"
              @click="emit('save', task)"
            ></v-btn>
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
            <v-tab value="custom">Custom</v-tab>
          </v-tabs>

          <div style="display: flex; gap: 10px">
            <v-select
              v-model="task.cron_period.day"
              :disabled="task.period !== 'custom'"
              :items="daysOfMonth"
              label="Day (month)"
            />
            <v-select
              v-model="task.cron_period.month"
              :items="months"
              item-title="label"
              item-value="value"
              :disabled="task.period !== 'custom'"
              label="Month"
            />
            <v-select
              v-model="task.cron_period.weekday"
              :disabled="task.period !== 'custom'"
              :items="daysOfWeek"
              item-title="label"
              item-value="value"
              label="Day (week)"
            />
          </div>

          <v-select
            label="Category"
            v-model="task.category"
            :items="appStore.categories"
            item-title="title"
            item-value="id"
          ></v-select>

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
              :active="menu"
              :focus="menu"
              label="Duration"
              required
              prepend-icon="mdi-timer-alert"
            >
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-time-picker
                  v-if="menu"
                  v-model="task.duration"
                  :hide-header="true"
                ></v-time-picker> </v-menu
            ></v-text-field>

            <v-text-field
              style="width: 45%"
              v-model="task.deadline"
              :active="menu2"
              :focus="menu2"
              label="Deadline"
              required
              prepend-icon="mdi-timer-alert"
            >
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                activator="parent"
                transition="scale-transition"
              >
                <v-time-picker
                  v-if="menu2"
                  v-model="task.deadline"
                  :hide-header="true"
                ></v-time-picker> </v-menu
            ></v-text-field>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
