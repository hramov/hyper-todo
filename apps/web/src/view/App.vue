<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAccountStore } from "../store/account.store";
import SkeletonLoader from "./layout/SkeletonLoader.vue";
import BottomMenu from "./layout/BottomMenu.vue";
import { router } from "../router";

const accountStore = useAccountStore();

const loaded = ref(false);

const telegramData = ref<{ user?: any }>({});

onMounted(async () => {
  loaded.value = false;
  telegramData.value = (window as any).Telegram.WebApp?.initDataUnsafe;
  await accountStore.getUser(telegramData.value.user);
  loaded.value = true;

  // telegram-specific requirement
  router.push({
    path: "/",
  });
});
</script>

<template>
  <div>
    <v-card class="container" v-if="loaded">
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-card>

    <SkeletonLoader v-else />

    <BottomMenu />
  </div>
</template>

<style scoped>
.container {
  min-height: calc(100vh - 52px);
  background-color: rgb(57, 54, 50);
}
</style>
