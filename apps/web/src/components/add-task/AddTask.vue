<script setup lang="ts">
import { reactive } from "vue";

import { useAppStore } from "./../../store/store";

const minutesToHoursAndMinutes = (time: number): string => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${loadZeros(hours)}:${loadZeros(minutes)}`;
};

const loadZeros = (duration: number) => {
  return String(duration).length === 1 ? "0" + duration : duration;
};

const props = defineProps(["dialog", "task"]);
const emit = defineEmits(["save", "close"]);

const appStore = useAppStore();

const task = reactive({
  id: props.task.id ?? null,
  period: props.task.period ?? "once",
  cron_period: props.task.cron_period ?? {
    day: null,
    month: null,
    weekday: null,
  },
  category: props.task.category ?? 1,
  title: props.task.title ?? "",
  description: props.task.description ?? "",
  date_start: props.task.date_start ?? new Date(),
  date_end: props.task.date_end ?? new Date(),
  duration: props.task.duration
    ? minutesToHoursAndMinutes(props.task.duration)
    : null,
  deadline: props.task.deadline
    ? new Date(props.task.deadline)
        .toLocaleTimeString("ru")
        .split(":")
        .filter((_, index) => index < 2)
        .join(":")
    : null,
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

const validate = () => {
  if (!task.duration || !task.deadline) {
    return false;
  }

  if (task.duration.split(":").length !== 2) {
    return false;
  }

  if (
    Number(task.duration.split(":")[0]) > 24 ||
    Number(task.duration.split(":")[0]) < 0
  ) {
    return false;
  }

  if (
    Number(task.duration.split(":")[1]) > 59 ||
    Number(task.duration.split(":")[1]) < 0
  ) {
    return false;
  }

  if (task.deadline.split(":").length !== 2) {
    return false;
  }

  if (
    Number(task.deadline.split(":")[0]) > 24 ||
    Number(task.deadline.split(":")[0]) < 0
  ) {
    return false;
  }

  if (
    Number(task.deadline.split(":")[1]) > 59 ||
    Number(task.deadline.split(":")[1]) < 0
  ) {
    return false;
  }

  return true;
};

const sendTask = () => {
  if (validate()) {
    emit("save", task);
  }
};
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

          <v-toolbar-title>Задача</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn text="Сохранить" variant="text" @click="sendTask"></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form style="padding: 10px">
          <v-tabs
            v-model="task.period"
            bg-color="dark"
            style="margin-bottom: 10px"
          >
            <v-tab value="once">Разово</v-tab>
            <v-tab value="ed">Ежедневно</v-tab>
            <v-tab value="ew">Еженедельно</v-tab>
            <v-tab value="custom" :disabled="true">Другое</v-tab>
          </v-tabs>

          <div style="display: flex; gap: 10px" v-if="task.period === 'custom'">
            <v-select
              v-model="task.cron_period.day"
              :items="daysOfMonth"
              label="День (месяца)"
            />
            <v-select
              v-model="task.cron_period.month"
              :items="months"
              item-title="label"
              item-value="value"
              label="Месяц"
            />
            <v-select
              v-model="task.cron_period.weekday"
              :items="daysOfWeek"
              item-title="label"
              item-value="value"
              label="День (недели)"
            />
          </div>

          <v-select
            label="Категория"
            v-model="task.category"
            :items="appStore.categories"
            item-title="title"
            item-value="id"
          ></v-select>

          <v-text-field
            v-model="task.title"
            label="Название"
            required
          ></v-text-field>

          <v-textarea
            v-model="task.description"
            label="Описание"
            required
          ></v-textarea>

          <div style="display: flex; gap: 10px">
            <v-date-input
              v-model="task.date_start"
              label="Дата начала"
              required
              prepend-icon="mdi-calendar"
            ></v-date-input>

            <v-date-input
              v-if="task.period !== 'once'"
              v-model="task.date_end"
              label="Дата окончания"
              required
              prepend-icon="mdi-calendar-check"
            ></v-date-input>
          </div>
          <div style="display: flex; gap: 10px">
            <v-text-field
              style="width: 45%"
              v-model="task.duration"
              label="Длительность"
              required
              prepend-icon="mdi-timer"
              placeholder="HH:MM"
            ></v-text-field>

            <v-text-field
              style="width: 45%"
              v-model="task.deadline"
              label="Дедлайн"
              required
              prepend-icon="mdi-timer-alert"
              placeholder="HH:MM"
            ></v-text-field>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
