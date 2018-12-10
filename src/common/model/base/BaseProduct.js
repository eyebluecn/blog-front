import BaseEntity from "./BaseEntity";

export default class BaseProduct extends BaseEntity {

  constructor(args) {
    super(args)
    this.name = null
    this.description = null
    this.fee = null

    this.validatorSchema = {
      name: {
        rules: [{required: true, message: '标题必填'}, {min: 1, max: 255, message: '标题最长255字'}],
        error: null
      },
      fee: {
        rules: function (rule, value, callback, source, options) {
          let errors = [];
          if (value !== parseInt(value, 10)) {
            errors.push("精确到分")
          }
          callback(errors);
        },
        error: null
      }
    }

  }


}

