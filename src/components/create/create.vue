<template>
    <div class="create-content">
      <section class="section">
        <div class="section-left">
          <header class="l-header">
            <a href="#" @click.prevent="clickgoHome">首页</a> / 发布话题
          </header>
          <div class="l-warpper">
            <div class="select-plate">
                <span>选择板块：</span>
                <select v-model="value" class="select">
                  <option v-for="item in plateList" :key="Math.random()" :value="item.value">{{item.label}}</option>
                </select>
            </div>
            <div class="create-title">
              <Input placeholder="标题字数10字以上" v-model="title" :clearable="true"></Input>
            </div>
            <div class="l-content">
                <mavon-editor
                  codeStyle="arta"
                  v-model="contentText"
                  :editable="true"
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
              <div class="createClick" @click="clickHander">提交</div>
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
            editContent:{},
            value:"",
            title:"",
            contentText:"",
            plateList:[
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
            }
          }
        },
      components:{
        Select,
        Input
      },
      methods:{
        clickHander(){
          let tab = this.value,
              title = this.title,
              content = this.contentText;
          let accesstoken = this.$store.state.usersaveAccess;
          let topic_id = this.editContent.id;

           if(!tab){
             alert('选择创建的话题模块');
             return;
           }
           if(title.trim().length < 4){
             alert('标题长度不能小于4');
             return;
           }
           if(!content.trim()){
             alert('内容不能为空');
             return;
           }

           let params = {
             tab,
             title,
             content,
             accesstoken,
             topic_id,
           };

          /**
           * 如果 topic_id 为undefined,则为新建主题。否则为编辑主题内容
           */
          if(!topic_id){
               this.http.createpPlate(params).then(({data}) => {
                 let {topic_id} = data;
                 this.$router.push({path:`/topic/${topic_id}`})
               })
           }
           else{
            this.http.getUpdate(params).then(({data}) => {
                let {topic_id} = data;
                this.$router.push({path:`/topic/${topic_id}`})
            })
          }

        },
        description(str){
          if(typeof str !== 'string'){
            return;
          }
          let description = str;
          description = description.replace(/(\n)/g, "");
          description = description.replace(/(\t)/g, "");
          description = description.replace(/(\r)/g, "");
          description = description.replace(/<\/?[^>]*>/g, "");
          description = description.replace(/\s*/g, "");
          return description;
        },

        // index
        clickgoHome(){
          this.$router.push({path:'/index'});
        }

        },
      created(){
          this.editContent = this.$store.state.editContent;
          this.value = this.editContent.tab || "";
          this.title = this.editContent.title;

          // js处理去掉富文本编辑的html，样式，只显示纯文字内容，以供列表页使用
          if(this.editContent.content){
            this.contentText = this.description(this.editContent.content);
          }

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
  .select {
    width: 218px;
    height: 28px;
    padding-left: 10px;
    border-radius: 4px;
    border: solid 1px #cccccc;
  }
</style>
