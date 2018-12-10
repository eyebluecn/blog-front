<template>
  <div class="widget-h5-editor">
    <div contenteditable="false" class="tool-bar clearfix">
      <div class="menu-group">
        <div class="menu-item" @click="erase">
          <a href="javascript:void(0)">
            <i class="fa fa-eraser"></i>
          </a>
          <div class="menu-tip">清除</div>
        </div>
        <div class="menu-item" @click="openXiumi">
          <a href="javascript:void(0)">
            <i class="fa fa-joomla"></i>
          </a>
          <div class="menu-tip">打开秀米</div>
        </div>
        <div class="menu-item" @click="fixImagesAndBackgrounds">
          <a href="javascript:void(0)">
            <i class="fa fa-gavel"></i>
          </a>
          <div class="menu-tip">修复图片</div>
        </div>

      </div>
    </div>
    <div ref="h5EditorContent"
         class="h5-editor-content rich-media-content"
         contenteditable="true"
         :placeholder="placeholder"
    ></div>
  </div>
</template>

<script>

  import Tank from "../model/tank/Tank";
  import $ from "jquery"

  export default {
    data() {
      return {
        innerValue: null,
        //标志当前是否正在做修复工作。
        fixing: false
      }
    },
    props: {
      value: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        required: false,
        "default"() {
          return "请从秀米编辑器中粘贴内容过来...";
        }
      }
    },
    computed: {},
    watch: {
      "value"(newVal, oldVal) {

        //场外变化
        if (this.innerValue !== newVal) {
          this.innerValue = newVal;
          this.updateEditableDom();


        }

      }
    },
    methods: {

      updateEditableDom() {
        this.$refs.h5EditorContent.innerHTML = this.innerValue;
      },
      updateInnerValue() {
        this.innerValue = this.$refs.h5EditorContent.innerHTML;
        this.$emit("input", this.innerValue)
      },

      bindEvent() {
        let that = this;
        $('body').on('focus', '[contenteditable]', function () {
          let $this = $(this);
          $this.data('before', $this.html());
          return $this;
        }).on('blur keyup paste input', '[contenteditable]', function (e) {

          let $this = $(this);
          if ($this.data('before') !== $this.html()) {
            $this.data('before', $this.html());
            $this.trigger('change');
          }
          return $this;
        });
        $(that.$refs.h5EditorContent).on("change", function () {

          that.fixImagesAndBackgrounds()
          that.updateInnerValue();
        })
      },
      erase() {
        this.fixing = false
        this.$refs.h5EditorContent.innerHTML = "";
        this.updateInnerValue();
      },
      openXiumi() {
        open("https://xiumi.us/")
      },
      isImageOk(img) {
        // During the onload event, IE correctly identifies any images that
        // weren’t downloaded as not complete. Others should too. Gecko-based
        // browsers act like NS4 in that they report this incorrectly.
        if (!img.complete) {
          return false;
        }

        // However, they do have two very useful properties: naturalWidth and
        // naturalHeight. These give the true size of the image. If it failed
        // to load, either of these should be zero.

        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
          return false;
        }

        // No other way of checking: assume it’s ok.
        return true;
      },
      fixAnImage(imgDom, successCallback, errorCallback) {
        let that = this;

        //首先从旧的图片中找寻
        let url = imgDom.getAttribute("data-origin-src")

        if (url) {
          //url存在表示这张图是以前修复过的。
          if (this.isImageOk(imgDom)) {
            //如果显示正常，那么直接跳过。
            successCallback()
            return;
          } else {
            //如果这时候显示不正常了，我们重新修复。
            console.log("修复", imgDom)
          }

        } else {
          //url不存在表示这张图没有修复过
          url = imgDom.getAttribute('src');
          if (url) {
            imgDom.setAttribute("data-origin-src", url)
          } else {
            //图片的src属性不存在，那么有问题。
            console.error("图片src属性不存在", imgDom)
            errorCallback()
            return;
          }
        }

        //开始上传
        let tank = new Tank()
        tank.httpCrawlDirect(url, tank.getAutoFilename(url), function (response) {

          imgDom.setAttribute("src", tank.url)

          successCallback()

        }, function () {
          errorCallback()
        })
      },
      fixImages() {
        let that = this;
        if (this.fixing) {
          console.error("正在修复中...请稍后再试...");
          return;
        } else {
          this.fixing = true;
        }

        let fixedNum = 0;
        let imgDoms = this.$refs.h5EditorContent.getElementsByTagName("img");
        if (imgDoms) {
          for (let i = 0; i < imgDoms.length; i++) {

            let imgDom = imgDoms[i];
            that.fixAnImage(imgDom, function () {

              fixedNum++;
              if (fixedNum === imgDoms.length) {
                that.fixing = false;
                console.log("修复工作全部完成")
              }
              that.updateInnerValue();

            }, function () {
              fixedNum++;
              if (fixedNum === imgDoms.length) {
                that.fixing = false;
                console.log("修复工作全部完成")
              }

            })


          }
        }

      },
      fixBackgrounds() {
        let that = this;
        let doms = this.$refs.h5EditorContent.getElementsByTagName("*");
        if (!doms) {
          return;
        }
        let length = doms.length;
        for (let i = 0; i < length; i++) {
          let dom = doms[i];

          let style = dom.getAttribute("style");
          if (style) {

            let urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            let urlArray = style.match(urlRegex);
            if (urlArray && urlArray.length > 0) {

              for (let j = 0; j < urlArray.length; j++) {
                let bgUrl = urlArray[j]

                //如果是修复过的，那么便不继续了
                if (!dom.getAttribute("data-origin-bg-url-" + j)) {
                  //开始上传
                  let tank = new Tank()
                  tank.httpCrawlDirect(bgUrl, tank.getAutoFilename(bgUrl), function (response) {
                    let newStyle = dom.getAttribute("style");

                    dom.setAttribute("data-origin-bg-url-" + j, bgUrl)
                    newStyle = newStyle.replace(bgUrl, tank.url)
                    dom.setAttribute("style", newStyle);

                    console.log("修复了", bgUrl, tank.url)

                  }, function () {

                  })
                }

              }

            }


          }
        }
      },
      fixImagesAndBackgrounds() {
        this.fixImages();
        this.fixBackgrounds();
      }
    },

    mounted() {
      this.bindEvent();

    }
  }


</script>

<style lang="less">

  .widget-h5-editor {

    /* 编辑器边框颜色 */
    @border-color: #ccc;

    /* 菜单颜色、上边框颜色 */
    @fore-color: #666;

    /* 菜单选中状态的颜色 */
    @selected-color: #1e88e5;

    /* input focus 时的颜色 */
    @focus-input-color: #1e88e5;

    /* 按钮颜色 */
    @button-color: #1e88e5;

    /* tab selected 状态下的颜色 */
    @selected-tab-color: #1e88e5;

    border: 1px solid #e5e6e7;
    padding: 0 10px 10px 10px;
    max-width: 400px;

    .tool-bar {
      width: 100%;
      border-bottom: 1px solid #f1f1f1;
      margin: 0 -10px 10px -10px;

      a {
        text-decoration: none;
      }

      // 菜单组
      .menu-group {
        float: left;
        padding: 0 8px;
      }

      // 单个菜单容器
      .menu-item {
        float: left;
        position: relative;
        text-align: center;
        height: 31px;
        width: 35px;

        // 菜单
        a {
          display: block;
          text-align: center;
          color: @fore-color;
          width: 100%;
          padding: 8px 0;
          font-size: 0.9em;
        }

        // tip提示
        .menu-tip {
          position: absolute;
          z-index: 20;
          text-align: center;
          background-color: @fore-color;
          color: #fff;
          padding: 7px 0;
          font-size: 12px;
          top: 100%;
          left: 50%;
          border-radius: 2px;
          box-shadow: 1px 1px 5px #999;

          width: 60px;
          margin-left: -30px;

          display: none;
        }

        &:hover {
          background-color: #f1f1f1;

          .menu-tip {
            display: block;
          }
        }

      }

    }
    .h5-editor-content {
      width: 100%;
      min-height: 300px;
      &:focus {
        outline: none;
      }

      &:empty:before {
        content: attr(placeholder);
        color: #aaa;
      }
      &:focus:before {
        content: none;
      }

    }
  }
</style>
