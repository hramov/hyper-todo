<script setup lang="ts">
import { ref } from "vue";

const page = ref("");
</script>

<template>
  <v-layout class="overflow-visible" style="margin-top: 20px">
    <v-bottom-navigation grow v-model="page">
      <v-btn to="/" value="">
        <v-icon>mdi-star-box-outline</v-icon>

        <span>Tasks</span>
      </v-btn>

      <v-btn to="/category" value="category">
        <v-icon>mdi-shape-outline</v-icon>

        <span>Categories</span>
      </v-btn>

      <v-btn to="/account" value="account">
        <v-icon>mdi-account-outline</v-icon>

        <span>Account</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
