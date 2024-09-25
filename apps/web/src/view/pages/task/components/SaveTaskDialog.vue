<script setup lang="ts">
import { reactive } from "vue";
import { useCategoryStore } from "../../../../store/category.store";
import { useUtilStore } from "../../../../store/util.store";
import { minutesToHoursAndMinutes } from "../../../../helpers/formatters";

const utilStore = useUtilStore();

const props = defineProps(["dialog", "task"]);
const emit = defineEmits(["save", "close"]);

const categoryStore = useCategoryStore();

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
              :items="utilStore.daysOfMonth"
              label="День (месяца)"
            />
            <v-select
              v-model="task.cron_period.month"
              :items="utilStore.months"
              item-title="label"
              item-value="value"
              label="Месяц"
            />
            <v-select
              v-model="task.cron_period.weekday"
              :items="utilStore.daysOfWeek"
              item-title="label"
              item-value="value"
              label="День (недели)"
            />
          </div>

          <v-select
            label="Категория"
            v-model="task.category"
            :items="categoryStore.categories"
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
            rows="3"
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
