<template>
    <div class="create-content">
      <section class="section">
        <div class="section-left">
          <header class="l-header">
            <a href="#">首页</a> / 发布话题
          </header>
          <div class="l-warpper">
            <div class="select-plate">
                <span>选择板块：</span>
                <Select v-model="value" style="width:218px; height: 28px; padding-left: 10px; border-radius: 4px; border-color: #cccccc;">
                  <Option v-for="item in plateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="create-title">
              <Input placeholder="标题字数10字以上" v-model="title" :clearable="true"></Input>
            </div>
            <div class="l-content">
                <mavon-editor
                  codeStyle="arta"
                  v-model="contentText"
                  placeholder=" "
                  fontSize="16"
                  :boxShadow="false"
                  defaultOpen="edit"
                  :toolbarsFlag="true"
                  :toolbars="toolbars"
                  :scrollStyle="true"
                  style="height: 500px;"
                >
                </mavon-editor>
              <div class="createClick">提交</div>
            </div>
          </div>
        </div>
        <div class="section-right">
          <header class="r-header">
            MarkDown语法参考
          </header>
          <ul class="r-list">
            <li>### 单行的标题</li>
            <li>**粗体**</li>
            <li>`console.log('行内代码')`</li>
            <li>```js\n code \n``` 标记代码块</li>
            <li>[内容](链接)</li>
            <li>![文字说明](图片链接)</li>
            <li><a href="https://segmentfault.com/markdown" target="_blank">Markdown 文档</a></li>
          </ul>
        </div>
      </section>
    </div>
</template>

<script>
  import {Select,Input} from 'iview';
    export default {
        data(){
          return {
            value:"",
            title:"",
            contentText:"",
            plateList: [
              {
                value:"",
                label:"请选择"
              },
              {
                value: 'share',
                label: '分享'
              },
              {
                value: 'ask',
                label: '问答'
              },
              {
                value: 'job',
                label: '招聘'
              },
              {
                value: 'dev',
                label: '客户端测试'
              }
            ],
            toolbars:{
              italic: true, // 斜体
              superscript: true, // 上角标
              link: true, // 链接
              imagelink: true, // 图片链接
              readmodel: true, // 沉浸式阅读
              trash: true, // 清空
              preview: true, // 预览
              header: true, // 标题
              fullscreen: true, // 全屏编辑
              bold: true, // 粗体
            },
          }
        },
      components:{
        Select,
        Input
      }
    }
</script>

<style scoped>
  .create-content {
    width: 100%;
    background: #e1e1e1;
    padding-top: 15px;
  }
  .section {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
  }
  .section-left {
    margin-right: 305px;
    background: #ffffff;
  }
  .section-right {
    width: 290px;
    position: absolute;
    right: 0;
    top: 0;
    background: #ffffff;
    border-radius: 4px;
  }
  .l-header {
    height: 40px;
    background: #f6f6f6;
    padding-left: 10px;
    color: #999999;
    line-height: 40px;
    border-bottom: solid 1px #e5e5e5;
  }
  .l-header>a {
    color: #80bd01;
  }
  .l-warpper {
    padding: 10px;
  }
  .select-plate {

  }
  .create-title {
    margin-top: 12px;
  }
  .l-content {
    margin-top: 13px;
  }
  .createClick {
    width: 52px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #ffffff;
    background: #0088cc;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
  }
  .createClick:hover {
    background: #0076bb;
  }
  .r-header {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: #444444;
    font-size: 12px;
    background: #f6f6f6;
  }
  .r-list {
    padding: 10px;
  }
  .r-list>li {
    line-height: 27px;
    color: #333333;
  }
  .r-list>li>a {
    color: #333333;
    text-decoration: underline;
  }
</style>
