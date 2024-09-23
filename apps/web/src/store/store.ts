import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("store", () => {
  const categories = ref([]);
  const user = ref({});

  const getUser = async (user: any) => {
    const response = await axios.post("/api/create-user", user);
    user.value = response.data;
  };

  const getCategories = async () => {
    const response = await axios.get("/api/categories");
    categories.value = response.data;
  };

  return { categories, user, getUser, getCategories };
});
