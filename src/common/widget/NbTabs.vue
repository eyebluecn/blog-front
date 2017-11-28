<template>
	<div class="nb-tabs" :class="{'border-style':borderStyle,'yellow-theme':!blueTheme,'blue-theme':blueTheme}">

		<!--栏目栏-->
		<div class="type-bar">

			<span>
				<span class="type" v-for="(tab,index) in tabs" v-if="tab.show" :class="{ 'active': tab.isActive }"
				      @click="tabClick(index)" @mouseenter="tabHover(index)">{{tab.label}}</span>
			</span>

			<span class="more">
				<slot name="more"></slot>
			</span>

		</div>

		<!--内容栏-->
		<div class="content-block">
			<slot></slot>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			initActiveTab: {
				type: Number,
				required: false
			},
			tabSelectedCallback: {
				type: Function,
				required: false
			},
			triggerHover: {
				type: Boolean,
				required: false,
				"default": false
			},
			borderStyle: {
				type: Boolean,
				required: false,
				"default": false
			},
			blueTheme: {
				type: Boolean,
				required: false,
				"default": false
			}
		},

		data(){
			return {

				tabs: []
			}
		},
		computed: {},
		watch: {
			"tabs"(newVal, oldVal){

				if (this.$children) {
					if (this.initActiveTab) {
						this.selectTab(this.initActiveTab);
					} else {
						this.selectTab(0);
					}
				}

			}
		},
		created() {
			this.tabs = this.$children;
		},

		methods: {
			tabClick(index){
				if (!this.triggerHover) {
					this.selectTab(index);
				}
			},
			tabHover(index){
				if (this.triggerHover) {
					this.selectTab(index);
				}
			},
			selectTab(index) {

				for (let i = 0; i < this.tabs.length; i++) {
					this.tabs[i].isActive = (i === index);
				}
				if (typeof this.tabSelectedCallback === "function") {
					this.tabSelectedCallback(index);
				}
			}
		},
		mounted() {

		}
	};
</script>

<style lang="less" rel="stylesheet/less">

	@import "../../../src/assets/css/global/variables";

	.nb-tabs(@main-color) {
		.type-bar {

			border-bottom: 1px solid @main-color;

			.type {
				display: inline-block;
				padding: 10px 15px;
				cursor: pointer;
				transition: border 0.4s, box-shadow 0.4s, background-color 0.2s;

				&:hover, &.active {
					background-color: @main-color;
					color: white;
				}

			}

			.more {
				display: inline-block;
				float: right;
				padding: 10px 0;
				cursor: pointer;
			}
		}

		&.border-style {

			.type-bar {
				border-bottom: none;
				.type {
					border-top: 1px solid @main-color;
					border-left: 1px solid @main-color;
					border-bottom: 1px solid @main-color;
					&:last-child {
						border-right: 1px solid @main-color;
					}
				}

			}

		}
	}




</style>
