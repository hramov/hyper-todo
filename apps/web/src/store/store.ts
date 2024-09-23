import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("store", () => {
  const categories = ref([]);
  const user = ref<{ id?: number }>({});
  const tasks = ref([]);

  const getTasks = async () => {
    const response = await axios.get("/api/tasks?user_id=" + user.value.id);
    tasks.value = response.data;
  };

  const deleteTask = async (id: number) => {
    const response = await axios.delete("/api/tasks/" + id);
    return response;
  };

  const setCompleted = async (id: number) => {
    const response = await axios.put("/api/tasks/complete/" + id);
    return response;
  };

  const getUser = async (dto: any) => {
    const response = await axios.post("/api/create-user", dto);
    user.value = response.data;
  };

  const getCategories = async () => {
    const response = await axios.get("/api/categories");
    categories.value = response.data;
  };

  const saveTask = async (task: any) => {
    await axios.post("/api/create-task", {
      ...task,
      user_id: user.value.id,
    });
  };

  return {
    categories,
    user,
    getUser,
    getCategories,
    getTasks,
    tasks,
    setCompleted,
    deleteTask,
    saveTask,
  };
});
