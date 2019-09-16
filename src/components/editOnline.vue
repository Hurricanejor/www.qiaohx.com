<template lang="html">
    <div class="">
        <div class="blog-title">
            <div class="col-md-10 col-xs-6">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="请输入标题">
                </div>
            </div>
            <div class="col-md-1 col-xs-3">
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="modal" data-target="#articleModal" aria-expanded="false">保存</button>
            </div>
            <div class="col-md-1 col-xs-3">
                <UserOperation></UserOperation>
            </div>
        </div>
        <!-- <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
      </Form> -->
        
        <div class="modal fade" id="articleModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">发布文章</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="pet_name" class="col-sm-2 control-label">分类</label>
                                <div class="col-sm-5">
                                    <select class="form-control">
                                        <option>请选择</option>
                                        <option>分类1</option>
                                        <option>分类2</option>
                                    </select>
                                </div>
                                <div class="col-sm-4">
                                    <label for="" data-toggle="modal" data-target="#typeModal">添加分类</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="true_name" class="col-sm-2 control-label">姓名</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="true_name" placeholder="请输入姓名">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-sm-2 control-label">Email</label>
                                <div class="col-sm-9">
                                    <input type="email" class="form-control" id="email" placeholder="请输入Email地址">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="col-sm-2 control-label">电话</label>
                                <div class="col-sm-9">
                                    <input type="number" class="form-control" id="phone" placeholder="请输入电话">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="col-sm-2 control-label">性别</label>
                                <div class="col-sm-9">
                                    <select class="form-control">
                                        <option>男</option>
                                        <option>女</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="col-sm-2 control-label">简介</label>
                                <div class="col-sm-9">
                                    <textarea name="" id="" placeholder="请简单的描述一下自己~" class="form-control" cols="3"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" @click="btnSaveArticle()" class="btn btn-primary">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="typeModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title">分类名称</h5>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                          <div class="form-group">
                              <label for="group_name" class="col-sm-3 control-label">名称</label>
                              <div class="col-sm-9">
                                  <input type="text" v-model="groupName" class="form-control" id="group_name" placeholder="请输入分类名称">
                              </div>
                          </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" @click="addGroup()" class="btn btn-primary">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="editor-md" class="main-editor">
          <textarea></textarea>
        </div>
        <Popup v-show="popFlag" :msg='popMsg'></Popup>
    </div>
</template>

<script>
import $s from "scriptjs"
import Popup from './popup'
import UserOperation from './userOperation'

export default {
    name: 'EditDocMainEditor',
    components: {
      Popup,
      UserOperation
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
      return {
        instance: null,
        popFlag: false,
        popMsg: "",
        groupName: "",
        titleName: ""
      };
    },
    watch: {
      instance() {
        deep: true
        // return this.instance;
      }
    },
    created() {
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
    beforeDestroy() {
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
                // that.$store.commit('ADD_COUNT', response.data.cid);
                // that.$router.push('/')
            }
            else{
                // that.bol = false;
                // that.items[1].flagUser = true;
                // that.items[1].tipValue = response.data.errMsg;
                // that.popFlag = true;
                // that.popMsg = "登录过期，请重新登录"
                // that.common.popup(that);
                
                // that.$store.commit('REMOVE_COUNT', response.data.cid);
                // that.$router.push('/Login')
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
  html{
    height: 100%;
  }
</style>




