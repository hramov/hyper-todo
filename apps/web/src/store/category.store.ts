import { defineStore } from "pinia";
import { ref } from "vue";
import { instance } from "../api";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const getCategories = async (user_id: number) => {
    const response = await instance.get("/category/user/" + user_id);
    categories.value = response.data;
  };

  return {
    categories,
    getCategories,
  };
});
