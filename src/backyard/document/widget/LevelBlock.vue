<template>

  <div class="level-block">

    <div class="panel panel-default">
      <div class="panel-heading clearfix"
           :class="{'error':article.errorMessage}"
           @click.stop.prevent="levelClick(article)">
        <div class="pull-left">
          <span v-if="!article.privacy">
            <i class="fa fa-eye-slash" title="该菜单在导航栏中不可见"></i>
          </span>
          <span>
						{{article.title?article.title:"请填写文章名称"}}
					</span>
          <span class="ml10">
						/xxxxx/<span class="label-attribute">{{article.path}}</span>
					</span>
          <span class="ml10 label-topic" v-if="article.type === ArticleType.DOCUMENT_URL">
						<i class="fa fa-link"></i>
						{{article.url}}
					</span>
        </div>
        <div class="pull-right">
          <ActionButtons :index="index" :article="article" :container="container" :editMode="editMode"/>
        </div>
      </div>

      <NbExpanding>
        <PanelBody v-if="article.editMode" :article="article" :container="container"/>
      </NbExpanding>
    </div>

    <LevelBlock v-for="(attr,attrIndex) in article.children"
                :key="attrIndex"
                :article="attr"
                :document="document"
                :index="attrIndex"
                :container="article.children"
                :editMode="editMode"/>

  </div>

</template>

<script>
  import ActionButtons from "./ActionButtons.vue"
  import PanelBody from "./PanelBody.vue"
  import NbExpanding from '../../../common/widget/NbExpanding.vue'
  import Article from "../../../common/model/article/Article";
  import {ArticleType, ArticleTypeList, ArticleTypeMap} from "../../../common/model/article/ArticleType";

  export default {
    //利用name，进行递归。
    name: 'LevelBlock',
    data() {
      return {
        ArticleType,
        ArticleTypeList,
        ArticleTypeMap
      }
    },
    props: {
      editMode: {
        type: Boolean,
        required: false,
        "default": false
      },
      article: {
        type: Article,
        required: false
      },
      document: {
        type: Article,
        required: true
      },
      container: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        required: true
      }

    },
    components: {
      ActionButtons,
      PanelBody,
      NbExpanding
    },
    computed: {},
    watch: {},
    methods: {
      levelClick(menu) {
        if (this.editMode) {

          if (menu.editMode) {
            //尝试去服务器保存。
            menu.httpSave(function () {
              menu.editMode = !menu.editMode
            })

          } else {

            if (!menu.special) {
              //去服务器确认一下详情。
              menu.httpDetail(function () {

                //看看dependency中有没有需要加载tank.
                if (menu.view.dependencies) {
                  let length = menu.view.dependencies.length;
                  let count = 0;
                  let finishCount = 0;
                  for (let i = 0; i < length; i++) {
                    let dependency = menu.view.dependencies[i];
                    if (dependency.type === 'TANK' && dependency.tank.uuid) {
                      count++
                      dependency.tank.httpDetail(function () {
                        finishCount++
                        if (count === finishCount) {
                          menu.editMode = true;
                        }
                      }, function () {
                        finishCount++
                        if (count === finishCount) {
                          menu.editMode = true;
                        }
                      });
                    }
                  }
                } else {
                  menu.editMode = true;
                }

              })
            }


          }


        }
      }
    },
    mounted() {
    }
  }
</script>
