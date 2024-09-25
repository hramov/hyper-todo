import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { instance } from "../api";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);

  const getTasks = async (user_id: number) => {
    const response = await instance.get("/task/user/" + user_id);
    tasks.value = response.data;
  };

  const saveTask = async (task: any, user_id: number) => {
    await instance.post("/task", {
      ...task,
      user_id,
    });
  };

  const findTaskById = (id: number): any => {
    return tasks.value.find((task: any) => task.id === id);
  };

  const completedTasks = computed<any>(() => {
    return tasks.value.filter((t: any) => t.status === "completed");
  });

  const pendingTasks = computed<any>(() => {
    return tasks.value.filter((t: any) => t.status !== "completed");
  });

  const setCompleted = async (task_id: number) => {
    const response = await instance.put("/task/" + task_id, {
      ...findTaskById(task_id),
      status: "completed",
    });
    return response;
  };

  const deleteTask = async (id: number) => {
    const response = await instance.delete("/task/" + id);
    return response;
  };

  return {
    tasks,
    getTasks,
    saveTask,
    setCompleted,
    deleteTask,
    findTaskById,
    completedTasks,
    pendingTasks,
  };
});
