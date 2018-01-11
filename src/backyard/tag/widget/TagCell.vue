<template>
	<router-link
		:to="active ? '/by/user/detail/' + tag.userUuid : '/by/user/detail/' + tag.userUuid + '?tagUuid=' + tag.uuid">
		<span class="tag-collection" :class="[size,{'active':active }]">
			<img :src="tag.logoUrl ? tag.logoUrl + '?imageProcess=resize&imageResizeM=fill&imageResizeW=100&imageResizeH=100' : defaultTagPath" alt="100">
			<span class="name">{{tag.name}}</span>
			<span v-if="operate" class="operate pull-right action-buttons">
								<router-link :to="'/by/tag/edit/'+tag.uuid">
									<i class="fa fa-pencil text-info f18"></i>
								</router-link>
								<a href="javascript:void(0)" title="删除" @click.stop.prevent="tag.confirmDel(delCallback)" style="outline: none;">
									<i class="fa fa-trash text-danger f18"></i>
                </a>
							</span>
		</span>
	</router-link>
</template>

<script>
  import Tag from '../../../common/model/tag/Tag'
  let defaultTagPath = require('../../../assets/img/tag.png')

  export default {
    name: 'tag',
    data () {
      return {
        defaultTagPath
      }
    },
    props: {
      tag: {
        type: Tag,
        required: true
      },
      size: {
        type: String,
        required: false,
        default: ''
      },
      active: {
        type: Boolean,
        required: false,
        default: false
      },
	    operate: {
        type: Boolean,
		    required: false,
		    default: false
	    },
      delCallback: {
        type: Function,
	      required: false,
	      default: function () {
		      return true
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../assets/css/global/variables.less";

	.tag-collection {

		@height: 16px;

		display: inline-block;
		margin: 0 10px 10px 0;
		padding: 0 5px 0 0;
		height: @height;
		background-color: #f7f7f7;
		border: 1px solid #dcdcdc;
		color: #333;
		border-radius: @height/2 2px 2px @height/2;
		vertical-align: top;
		overflow: hidden;
		box-sizing: content-box;

		&:hover {
			color: @brand-primary;
		}

		img {
			width: @height;
			height: @height;
			border-radius: 50%;
			vertical-align: top;
		}
		.name {
			display: inline-block;
			font-size: 12px;
			line-height: 15px;
			vertical-align: top;
		}

		&.lg {
			@height: 24px;

			height: @height;
			border-radius: @height/2 2px 2px @height/2;

			img {
				width: @height;
				height: @height;
			}
			.name {
				font-size: 16px;
				line-height: (@height - 1px);
			}

		}

		&.detail-lg {
			@height: 40px;
			width: 100%;
			box-sizing: border-box;
			margin-bottom: 15px;
			height: @height;
			border-radius: @height/2 2px 2px @height/2;

			img {
				width: @height;
				height: @height;
			}
			.name {
				font-size: 18px;
				line-height: (@height - 1px);
			}
			.operate{
				font-size: 18px;
				line-height: (@height - 1px);
			}

		}

		&.active {
			background-color: @brand-primary;
			border: 1px solid @brand-success;
			color: white;
			&:hover {
				background-color: darken(@brand-primary, 10%);
			}
		}

	}
</style>
