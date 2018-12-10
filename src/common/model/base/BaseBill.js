import BaseEntity from "./BaseEntity";
import User from "../user/User";
import {PayStatus, PayStatusList} from "../pay/PayStatus";
import Pay from "../pay/Pay";
import Filter from "./Filter";
import {FilterType} from "./FilterType";

export default class BaseBill extends BaseEntity {

  constructor(args) {
    super(args)
    this.userUuid = null;
    //支付信息
    this.payUuid = null;
    //赠送礼物数量
    this.num = 0;
    //订单总金额
    this.amount = 0;
    this.status = PayStatus.UNPAID;
    this.user = new User();
    //这里为了防止one-to-one循环依赖
    this.pay = null;
  }

  render(obj) {
    super.render(obj)
    this.renderEntity("user", User)
    this.renderEntity("pay", Pay)
  }

  getFilters() {
    return [
      ...super.getFilters(),
      new Filter(FilterType.INPUT, '用户', 'userUuid', null, User, false),
      new Filter(FilterType.INPUT, '手机', 'phone'),
      new Filter(FilterType.INPUT, '支付单号', 'payUuid', null, null, false),
      new Filter(FilterType.MULTI_SELECTION, '状态', 'statuses', PayStatusList)
    ]
  }


}

