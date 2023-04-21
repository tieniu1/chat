<template>
  <div class="box">
    <div class="nav">
      <div v-for="item in 10" :key="item" class="nav_item">
        <div class="nav_item_text">{{ item }}</div>
        <div class="nav_item_close">x</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        {{ text }}
      </div>
      <div class="conversation-x">
        <div v-for="item in conversationData" :key="item.id">
          <div
            v-if="item.name === 'chat'"
            class="conversation_item conversation_item-left"
          >
            <div class="avatar"></div>
            <div class="chat"></div>
          </div>
          <div v-else class="conversation_item conversation_item-right">
            <div class="avatar"></div>
            <div class="chat"></div>
          </div>
        </div>
      </div>

      <div class="input-x">
        <div class="input" contenteditable="true" @keyup="changeInput"></div>
        <div class="send" @click="odSend">▶</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const conversationData = ref([
  {
    name: "chat",
    id: "111",
    data: {},
  },
  {
    name: "me",
    id: "111",
    data: {},
  },
]);
const text = ref("");
const changeInput = (e: any) => {
  text.value = e.target.innerText;
};

const odSend = () => {
  console.log("odSend");
};
</script>
<style lang="less" scoped>
@import url(@/css/HomeView.less);
</style>
