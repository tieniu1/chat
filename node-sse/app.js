const express = require('express');
const cors = require('cors');
// 

const app = express();
const port = 3000;

// 设置cors
app.use(cors());

app.post('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream', // 设置SSE
    'Cache-Control': 'no-cache', // 防止客户端缓存事件流
    'Connection': 'keep-alive' // 保持连接
  });
  // 刷新头信息,避免缓存
  res.flushHeaders();
  //1s发送一次数据
  let time = 0
  let txtIndex = 0
  let txt = "要在HTML中使用Showdown，你需要先引入Showdown的JavaScript文件。可以通过以下方式实现：\n\n```html\n<script src=\"https://cdn.jsdelivr.net/npm/showdown@1.9.1/dist/showdown.min.js\"></script>\n```\n\n接下来，你需要在页面中创建一个文本区域用于输入Markdown代码，例如：\n\n```html\n<textarea id=\"markdown-input\"></textarea>\n```\n\n然后，你需要创建一个用于显示转换后的HTML的元素，例如：\n\n```html\n<div id=\"html-output\"></div>\n```\n\n接下来，你需要编写JavaScript代码来使用Showdown将Markdown代码转换为HTML，并将结果显示在页面上。以下是一个示例代码：\n\n```html\n<script>\n  // 获取输入和输出元素\n  var markdownInput = document.getElementById('markdown-input');\n  var htmlOutput = document.getElementById('html-output');\n\n  // 创建Showdown对象\n  var converter = new showdown.Converter();\n\n  // 监听输入框的输入事件\n  markdownInput.addEventListener('input', function() {\n    // 将Markdown代码转换为HTML\n    var html = converter.makeHtml(markdownInput.value);\n    // 将转换后的HTML显示在输出元素中\n    htmlOutput.innerHTML = html;\n  });\n</script>\n```\n\n这样，当用户在输入框中输入Markdown代码时，页面上的HTML输出区域将自动更新显示转换后的HTML代码。"
  let timer = setInterval(() => {
    const data = {
      "id": "chatcmpl-78KN4AlWYSxF8p1EzVime0az1mCUz",
      "object": "chat.completion",
      "created": 1682219286,
      "model": "gpt-3.5-turbo-0301",
      "usage": {
          "prompt_tokens": 23,
          "completion_tokens": 325,
          "total_tokens": 348
      },
      "choices": [
          {
              "delta": {
                  "role": "assistant",
                  "content": txt[txtIndex],
              },
              "finish_reason": null,
              "index": 0
          }
      ]
  };
    /*
      将新数据发送给客户端
      SSE数据格式:data:是固定的,在每个事件之间必须有一个空行\n\n
    */
   if (txtIndex>=txt.length) {
   res.write(`data: [DONE]`);
    return false
   }
   txtIndex++
    res.write(`data: ${JSON.stringify(data)}`);
  },10);
});


// 启动服务
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});