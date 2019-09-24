<template lang="html">
    <div class="">
        <!-- <Test></Test> -->
        <Form ref="formData" :model="formData"  :rules="ruleForm">
          <FormItem prop="title">
            <Row :gutter="16">
                <Col span="20"><Input type="text" v-model="formData.title" placeholder="请输入标题"></Input></Col>
                <Col span="2"><Button @click="handleClick" type="primary">发布文章</Button></Col>
                <Col span="2"><UserOperation></UserOperation></Col>
            </Row>
          </FormItem>
          <Modal v-model="modal1" title="发布文章" @on-ok="ok" @on-cancel="cancel">
            <FormItem>
              <Row :gutter="16">
                <Col span="3"><Label>分类</Label></Col>
                <Col span="10"><Input type="text" v-model="formData.group" placeholder="如有多个请用逗号隔开"></Input></Col>
                <Col span="6"><Button @click="" type="info">已有分类</Button></Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row :gutter="16">
                <Col span="3"><Label>关键字</Label></Col>
                <Col span="17"><Input type="text" v-model="formData.keyword" placeholder="如有多个请用逗号隔开"></Input></Col>
              </Row>
            </FormItem>
          </Modal>
          <div id="editor-md" class="main-editor">
            <textarea v-model="formData.content"></textarea>
          </div>
          <Popup v-show="popFlag" :msg='popMsg'></Popup>
        </Form>
    </div>
</template>

<script>
import $s from "scriptjs"
import Popup from './popup'
import UserOperation from './userOperation'
import AddTags from './addTags'
import Test from './test'

export default {
    name: 'EditDocMainEditor',
    components: {
      Popup,
      UserOperation,
      AddTags,
      Test
    },
    props: {
      editorPath: {
        type: String,
        default: '../../static/',
      },
      editorConfig: {
        type: Object,
        default() {
          return {
            width: '100%',
            height: 'calc(100vh - 150px)',
            path: '../../static/MDeditor/lib/', // Autoload modules mode, codemirror, marked... dependents libs path
            codeFold: true,
            saveHTMLToTextarea: true,
            searchReplace: true,
            htmlDecode: 'style,script,iframe|on*',
            taskList: true,
            toolbarIcons: 'customize',
            tocm: true,                  // Using [TOCM]
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            // imageUploadURL: 'examples/php/upload.php',
            onload: () => {
              // eslint-disable-next-line
              // console.log('onload', this);
            },
          };
        },
      },
    },
    data() {
      const validateTitle = (rule, value, callback) => {
        // console.log(rule)
        console.log("1====="+value)
        console.log("2====="+this.formData.title)
          if (value === '') {
              callback(new Error('请输入标题！'));
          }
      };
      return {
        instance: null,
        popFlag: false,
        popMsg: "",
        groupName: "",
        titleName: "",
        modal1: false,
        formData: {
            title: "",
            content: "",
            group: "",
            keyword: ""
        },
        ruleForm: {
          title: [
              { validator: validateTitle, trigger: 'blur' }
          ],
          group: [
            {required: true}
          ]
        }
      };
    },
    watch: {
      instance() {
        deep: true
      }
    },
    mounted() {
      $s([
        `${this.editorPath}jquery.min.js`,
        `${this.editorPath}zepto.min.js`,
      ], () => {
        $s(`${this.editorPath}MDeditor/editormd.min.js`, () => {
          this.initEditor();
        });
      });
    },
    methods: {
      initEditor() {
        if(this.$store.getters.certainLogin){
          this.$nextTick((editorMD = window.editormd) => {
            if (editorMD) {
              this.instance = editorMD('editor-md', this.editorConfig);
            }
          });
        }else {
            this.popFlag = true;
            this.popMsg = "登录过期，请重新登录"
            this.common.popup(this);
            
            this.$store.commit('REMOVE_COUNT', '');
            this.$router.push('/Login')
        }
      },
      addGroup() {
        var that = this;
        this.$axios.post(this.$base.baseUrl + this.$base.addGroupUrl, {
          "cid": this.$store.state.token,
          "groupName": this.groupName
        }).then(function (res) {
          console.log(that.$store.state.token)
          console.log(res);
        });
      },
      ok () {
          this.$Message.info('OK');
      },
      cancel () {
          this.$Message.info('已取消');
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
      },
      handleClick() {
        // 点击 【发布文章】 按钮 验证 title 如果符合验证规则 则弹窗
          this.$refs.formData.validateField('title');
          console.log(this.formData.title)
          if(this.formData.title !== "") {
            this.modal1 = true;
          }
      },
      btnSaveArticle() {
        var that = this;
        
        // this.$options.methods.getMarkdown()
        this.$axios.post(this.$base.baseUrl + this.$base.articleAddUrl, {
            "cid": this.$store.state.token,
            "content": "文章内容*",
            "groupId": "分组Id*",
            "keyWord": "",
            "title": "文章标题*"
        }).then(function (response) {
            console.log(response)
            if(response.data.code == 0 && response.status == 200){
                that.$store.commit('ADD_COUNT', response.data.cid);
                that.$router.push('/')
            }
            else{
                that.bol = false;
                that.items[1].flagUser = true;
                that.items[1].tipValue = response.data.errMsg;
                that.popFlag = true;
                that.popMsg = "登录过期，请重新登录"
                that.common.popup(that);
                
                that.$store.commit('REMOVE_COUNT', response.data.cid);
                that.$router.push('/Login')
            }
        }).catch(function (error) {
            console.log(error);
        });
      }
    }
  };
</script>

<style type="text/css">
@import "../../static/MDeditor/css/editormd.css";
</style>
<style type="text/css">
  html{ height: 100%; }
  #app{ margin-top: 10px; }
  .navbar-nav>li>a { padding: 8px !important; }
</style>




