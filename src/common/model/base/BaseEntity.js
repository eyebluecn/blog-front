import Base from './Base'
import {str2Date} from '../../filter/time'
import Filter from './Filter'
import {MessageBox, Message} from 'element-ui'
import Schema from 'async-validator'
import {appendString} from "../../util/Utils";
import {startWith} from "../../filter/str";
import {FilterType} from "./FilterType";

export default class BaseEntity extends Base {

  constructor(args) {
    super(args)
    this.uuid = null
    this.sort = null
    this.createTime = null
    this.updateTime = null
    this.deleted = false

    //表单验证专用
    this.validatorSchema = {}
  }

  //This is just a intermedia method.
  render(obj) {

    super.render(obj)
    this.createTime = str2Date(this.createTime)
    this.updateTime = str2Date(this.updateTime)

  }

  //获取过滤器，必须每次动态生成，否则会造成filter逻辑混乱。
  getFilters() {
    return [
      new Filter(FilterType.SORT, '排序', 'orderSort'),
      new Filter(FilterType.SORT, '修改时间排序', 'orderUpdateTime'),
      new Filter(FilterType.SORT, '创建时间排序', 'orderCreateTime')
    ]
  };

  //获取表单的验证规则
  getSchema() {

    return null

  }


  //该实体目前是否能够编辑
  canEdit() {
    console.error('canEdit: you should override this base method.')
  }

  //该实体目前是否能够删除
  canDel() {
    console.error('canDel: you should override this base method.')
  }

  getForm() {
    console.error('getForm: you should override this base method.')
  }


  //验证某个Schema是否正确。返回错误信息，null表示没有错误。
  validate(validatorSchema = this.validatorSchema) {

    let errorMessage = null
    let that = this
    let schema = validatorSchema
    if (!schema) {
      return null
    }

    //遍历规则的key值
    let validateArr = Object.keys(schema)
    let validateObj = {}
    validateArr.forEach(function (i) {
      validateObj[i] = that[i]
      schema[i].error = null
    })

    //这里相当于要把自定义的error给去掉啦。
    let descriptor = {}
    validateArr.forEach(function (i) {
      descriptor[i] = schema[i].rules
    })

    new Schema(descriptor).validate(validateObj, (errors, fields) => {

      if (errors) {
        console.log("此刻的errors:", errors)

        errors.forEach(function (errorItem) {

          //回填到每个字段的验证细节上。

          schema[errorItem.field].error = appendString(schema[errorItem.field].error, errorItem.message, ";")
          errorMessage = appendString(errorMessage, errorItem.message, ";")

          console.log("此刻的errorItem:", errorItem)
          console.log("此刻的schema[errorItem.field]:", schema[errorItem.field])
        })
      }
    })

    return errorMessage

  }

  //获取当前类的EntityType
  getEntityType() {
    let originName = this.getTAG();
    let res = originName.replace(/([A-Z])/g, "_$1").toUpperCase();
    if (startWith(res, "_")) {
      res = res.substr(1, res.length);
    }

    return res;
  }

  //在FilterType=HTTP_SELECTION 我们需要知道展示的名称，以及进行筛选的value
  getDisplayName(){
    console.error("you should override getDisplayName method")
  }
  setDisplayName(displayName){
    console.error("you should override setDisplayName method")
  }



  //common http detail methods.
  httpDetail(successCallback, errorCallback) {

    let that = this
    if (!this.uuid) {

      this.errorMessage = '没有详情！'

      this.defaultErrorHandler(this.errorMessage, errorCallback)

      return
    }

    let url = this.getUrlDetail(this.uuid)

    if (!url) {
      return
    }

    this.detailLoading = true

    this.httpGet(url, {}, function (response) {
      that.detailLoading = false

      that.render(response.data.data)

      that.safeCallback(successCallback)(response)

    }, function (response) {

      that.detailLoading = false

      if (typeof errorCallback === 'function') {
        errorCallback(that.getErrorMessage(response), response)
      } else {
        //没有传入错误处理的方法就采用默认处理方法：toast弹出该错误信息。
        that.defaultErrorHandler(response)
      }
    })

  }

  httpSave(successCallback, errorCallback) {

    let that = this

    let url = this.getUrlCreate()
    if (this.uuid) {
      url = this.getUrlEdit()
    }

    this.errorMessage = this.validate()
    if (this.errorMessage) {
      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    this.httpPost(url, this.getForm(), function (response) {

      that.render(response.data.data)

      that.safeCallback(successCallback)(response)

    }, errorCallback)

  }

  httpDel(successCallback, errorCallback) {

    let that = this
    if (!this.uuid) {

      this.errorMessage = '没有uuid，无法删除！'
      that.defaultErrorHandler(this.errorMessage, errorCallback)

      return
    }

    let url = this.getUrlDel(this.uuid)

    if (!url) {
      return
    }

    this.httpPost(url, {}, function (response) {

      that.safeCallback(successCallback)(response)

    }, errorCallback)

  }

  httpSort(entity1, entity2, successCallback, errorCallback) {

    let uuid1 = entity1.uuid;
    let sort1 = entity2.sort;
    let uuid2 = entity2.uuid;
    let sort2 = entity1.sort;

    let that = this

    if (!uuid1 || !uuid2 || !(sort1 === 0 || sort1) || !(sort2 === 0 || sort2)) {

      this.errorMessage = '参数不齐！'
      that.defaultErrorHandler(this.errorMessage, errorCallback)

      return
    }

    let url = this.getUrlSort()

    if (!url) {

      that.defaultErrorHandler(this.errorMessage, errorCallback)
      return
    }

    let params = {
      uuid1: uuid1,
      sort1: sort1,
      uuid2: uuid2,
      sort2: sort2
    }

    this.httpPost(url, params, function () {
      entity1.sort = sort1;
      entity2.sort = sort2;
      that.safeCallback(successCallback)()


    }, errorCallback)
  }

  //确认删除操作.
  confirmDel(successCallback, errorCallback) {

    let that = this

    MessageBox.confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(function () {

        that.httpDel(function () {
          Message.success({
            message: '成功删除!'
          })

          if (typeof successCallback === 'function') {
            successCallback()
          }

        }, errorCallback)

      },
      function () {
        that.safeCallback(errorCallback)()

      }
    )
  }

  getUrlCreate() {
    let prefix = this.getUrlPrefix()

    return prefix + '/create'
  }

  getUrlDel(uuid = null) {
    let prefix = this.getUrlPrefix()

    if (uuid === null) {
      return prefix + '/del/{uuid}'
    } else {
      return prefix + '/del/' + uuid
    }

  }

  getUrlEdit() {
    let prefix = this.getUrlPrefix()

    return prefix + '/edit'
  }

  getUrlDetail(uuid = null) {
    let prefix = this.getUrlPrefix()

    if (uuid === null) {
      return prefix + '/detail/{uuid}'
    } else {
      return prefix + '/detail/' + uuid
    }

  }

  getUrlPage() {
    let prefix = this.getUrlPrefix()

    return prefix + '/page'
  }

  getUrlSort() {
    let prefix = this.getUrlPrefix()

    return prefix + '/sort'
  }

}

