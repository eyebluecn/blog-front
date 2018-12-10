import { simpleDateTime } from '../../filter/time'
import UserInputSelection from '../../../backyard/user/widget/UserInputSelection'
import BaseEntity from '../base/BaseEntity'
import Filter from '../base/Filter'
import Tank from '../tank/Tank'
import User from '../user/User'
import {FilterType} from "../base/FilterType";

export default class Tag extends BaseEntity {
  constructor (args) {
    super(args)
    this.userUuid = null
    this.name = null
    this.logoTank = new Tank('image', false, 1024 * 1024, '图片不能超过1M')
    this.logoTankUuid = null
    this.logoUrl = null
    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '名称必填'}, {min: 1, max: 45, message: '名称最长45字'}],
        error: null
      }
    }
  }

  render(obj){
    super.render(obj)
    this.renderEntity('logoTank',Tank)
  }


  getFilters () {
    return [
      ...super.getFilters(),
      new Filter(FilterType.INPUT, '名称', 'name'),
      new Filter(FilterType.HTTP_INPUT_SELECTION, '用户', 'userUuid', null, User, false, UserInputSelection)
    ]
  }

  getForm(){
    return{
      name: this.name,
      logoTankUuid: this.logoTankUuid,
      logoUrl: this.logoUrl,
      uuid: this.uuid ? this.uuid : null
    }
  }

  validate () {
    if(this.logoTank){
      this.logoTankUuid = this.logoTank.uuid
      this.logoUrl = this.logoTank.url
    }
    return super.validate()
  }

}
