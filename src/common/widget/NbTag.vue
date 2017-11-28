<template>

	<div>
		<div v-if="!pager.loading">
			<Multiselect v-model="innerTags"
			             tag-placeholder="点击添加"
			             placeholder="搜索或添加"
			             selectedLabel="已选"
			             deselectLabel="点击移除"
			             selectLabel="点击选择"
			             :options="options"
			             :multiple="true"
			             :taggable="taggable"
			             :max="1"
			             @tag="addTag"
			             @select="select"
			>
				<span class="italic" slot="maxElements">
					最多只能选择1项
				</span>
				<span class="italic" slot="noResult">
					没有符合条件的条目
				</span>
			</Multiselect>
		</div>
		<div v-if="pager.loading">
			<i class="fa fa-spinner fa-spin fa-fw"></i>
		</div>
	</div>

</template>

<script>

	//对于之选一个的，我们已经做好了充足的准备了，无需外面再传一个arr进来。
	//文档;http://monterail.github.io/vue-multiselect/
	import Multiselect from "vue-multiselect";
	import "vue-multiselect/dist/vue-multiselect.min.css";
	import Pager from "../../common/model/base/Pager";
	export default{
		model: {
			prop: 'tag',
			event: 'option'
		},
		data() {
			return {
				innerTags: [],
				options: [],
				pager: new Pager(this.Clazz, 50)
			};
		},
		props: {
			//我们的备选项来自这个Clazz.
			Clazz: {
				type: Function,
				required: false,
				"default": null
			},
			tag: {
				type: String | null,
				"default": null
			},
			//允许自定义输入
			taggable: {
				type: Boolean,
				"default": true
			},
			//列表的过滤条件
			initFilter: {
				type: Object,
				required: false
			}
		},
		components: {
			Multiselect
		},
		watch: {
			"innerTags"(newVal, oldVal){

				if (this.innerTags) {

					if (this.innerTags.length > 0) {
						this.$emit('option', this.innerTags[0]);
					} else {
						this.$emit('option', null);
					}

				}

			},
			"tag"(newVal, oldVal){

				this.fillInnerTags();

			}
		},
		methods: {
			refresh(){
				let that = this;
				if (!this.Clazz) {
					return;
				}
				this.pager.httpFastPage(function () {
					let list = that.pager.getList();
					if (list && list.length > 0) {
						that.options.splice(0, that.options.length);
						list.forEach(item => {

							that.options.push(item.name);

						})
					}
				});
			},
			//用tags的元素去装填innerTags
			fillInnerTags(){
				if (this.innerTags[0] === this.tag) {
					//Event from inner.

				} else {
					//Event from outer

					//清空innerTags
					this.innerTags.splice(0, this.innerTags.length);
					//把tags中所有的item追加过来

					if (this.tag) {
						this.innerTags.push(this.tag)
					}

				}
			},

			//手动输入标签
			addTag (newTag) {

				this.innerTags.push(newTag);

			},
			//标签选中的回掉函数
			select(newTag){

			}

		},
		mounted() {
			this.fillInnerTags();

			if (this.initFilter) {
				for (let key in this.initFilter) {
					this.pager.setFilterValue(key, this.initFilter[key]);
				}
			}

			this.refresh();

		}
	}
</script>


<style lang="less" rel="stylesheet/less">

	.multiselect {

		&.multiselect--active {
			z-index: 1100;
		}
		.multiselect__content {
			z-index: 1100;
		}

	}

</style>

