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

  const getUser = async (dto: any) => {
    const response = await axios.post("/api/create-user", dto);
    user.value = response.data;
  };

  const getCategories = async () => {
    const response = await axios.get("/api/categories");
    categories.value = response.data;
  };

  return { categories, user, getUser, getCategories, getTasks, tasks };
});
