import { defineStore } from "pinia";
import { ref } from "vue";
import { instance } from "../api";

export const useAccountStore = defineStore("account", () => {
  const user = ref<any>({});

  const getUser = async (dto: any) => {
    const response = await instance.post("/account", dto);
    user.value = response.data;
  };

  return {
    user,
    getUser,
  };
});
