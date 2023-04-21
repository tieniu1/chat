<template>
  <div class="container">
    <div class="nav">
      <div v-for="item in 10" :key="item" class="nav-item" flex>
        <div mr-10>{{ item }}</div>
        <div>{{ item }}</div>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>
