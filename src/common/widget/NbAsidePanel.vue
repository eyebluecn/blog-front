<template>
	<div class="nb-aside-panel" :class="titleLength+' '+forceLength">
		<div class="media">
			<div class="pull-left">
				<div class="book-tag" :class="color">{{title}}</div>
			</div>
			<div class="media-body">
				<div class="book-content" :class="{'null-content':nullContent}">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data () {
			return {}
		},
		computed: {
			titleLength(){
				if (!this.title) {
					return "zero";
				}
				let len = this.title.length;

				if (len > 8) {
					len = 8;
				}
				return ["zero", "one", "two", "three", "four", "five", "six", "seven", "infinity"][len];
			},
			forceLength(){
				let len = 0;

				if (!this.forceNum) {
					len = 0;
				} else {
					len = this.forceNum;
				}
				if (len > 8) {
					len = 8;
				}
				return ["", "force-one", "force-two", "force-three", "force-four", "force-five", "force-six", "force-seven", "force-infinity"][len];
			}

		},
		components: {},
		props: {
			title: {
				type: String,
				required: true
			},
			//样式默认primary，可选择：primary,info,success,warning,danger,default,gray,blue
			color: {
				type: String,
				required: false,
				"default"() {
					return "primary"
				}
			},
			//空内容，content没有白色背景，没有padding
			nullContent: {
				type: Boolean,
				required: false,
				"default": false
			},
			//本来只有两个字，但是希望强制展开到4个字
			forceNum: {
				type: Number,
				required: false,
				"default": 0
			}
		},
		methods: {},
		mounted(){
		}
	}
</script>


<style lang="less" rel="stylesheet/less">
	@import "../../assets/css/global/variables";

	.nb-aside-panel {

		//左侧数千样式
		.book-tag {

			width: 43px;
			background-color: @brand-primary;
			font-size: 18px;
			color: white;
			border-radius: 4px;
			padding: 15px 0 15px 12px;

			&.primary {
				background-color: @brand-primary;
			}
			&.info {
				background-color: @brand-info;
			}
			&.success {
				background-color: @brand-success;
			}
			&.warning {
				background-color: @brand-warning;
			}
			&.danger {
				background-color: @brand-danger;
			}
			&.blue {
				background-color: #4A90E2;
			}
			&.gray {
				background-color: #AEAEAE;
			}

		}
		.book-content {
			background-color: white;
			border-radius: 4px;
			padding: 15px;

			&.null-content {
				background-color: transparent;
				padding: 0;
			}
		}

		&.zero {

		}
		&.one {

		}
		&.two {

		}
		&.three {
			.book-content {
				min-height: 105px;
			}

		}
		&.four {
			.book-content {
				min-height: 130px;
			}

		}
		&.five {
			.book-content {
				min-height: 155px;
			}
		}
		&.six {

		}
		&.seven {

		}
		&.infinity {

		}

		&.force-four {
			.book-tag {
				padding: 40px 0 40px 12px;
			}
			.book-content {
				min-height: 130px;
			}
		}

	}


</style>


