<template>
	<a class="tag-collection" :class="{ 'size':size, 'active':active }" :href="active ? '/by/user/detail/' + tag.userUuid : '/by/user/detail/' + tag.userUuid + '?tagUuid=' + tag.uuid">
		<img :src="tag.logoUrl + '?imageProcess=resize&imageResizeM=fill&imageResizeW=100&imageResizeH=100'" alt="100">
		<span class="name">{{tag.name}}</span>
	</a>
</template>

<script>
  import Tag from '../../../common/model/tag/Tag'

  export default {
    name: 'tag',
	  data(){
      return{

      }
	  },
	  props:{
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