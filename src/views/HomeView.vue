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
        <div v-for="(item, index) in conversationData" :key="index">
          <div
            v-if="item.role === 'assistant'"
            class="conversation_item conversation_item-left"
          >
            <div class="avatar"></div>
            <!-- <div class="chat">{{ item.content }}</div> -->
            <div class="chat">
              <div v-html="showText(item.content)"></div>
            </div>
          </div>
          <div
            v-else-if="item.role === 'user'"
            class="conversation_item conversation_item-right"
          >
            <div class="avatar"></div>
            <div class="chat">{{ item.content }}</div>
          </div>
        </div>
      </div>

      <div class="input-x">
        <div
          class="input"
          ref="input"
          contenteditable="true"
          @keyup="changeInput"
          @keydown="onKeyDown"
        ></div>
        <div class="send" @click="send">▶</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Ref } from "vue";

import hljs from "highlight.js";
import showdown from "showdown";
interface conversation {
  role: "user" | "assistant";
  content: string;
}
onMounted(() => {
  hljs.highlightAll();
});
let converter = new showdown.Converter();

const conversationData: Ref<conversation[]> = ref();
const text = ref("");
const input = ref(null);
const changeInput = (e: any) => {
  text.value = e.target.innerText;
};
// 发信息
const send = async () => {
  conversationData.value.push({
    role: "user",
    content: text.value,
  });

  text.value = "";
  input.value.innerText = "";
  try {
    const data = await postData("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [...conversationData.value],
    });
    console.log("data-------", data);

    const { role, content } = data.choices[data.choices.length - 1].message;
    conversationData.value.push({
      role,
      content,
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
//  封装请求
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Authorization: "Bearer sk-GxcvIvqhD0I8tEPtjHhRT3BlbkFJ8IXjkz5Dcj8rANdi",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
const showText = (text = "") => {
  return converter.makeHtml(text);
};
// ctrl+enter 发送
const onKeyDown = (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    send();
  }
};
</script>
<style lang="less" scoped>
@import url(@/css/HomeView.less);

@import "~highlight.js/styles/monokai.css";
</style>
